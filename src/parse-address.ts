import { removeRepeatedSpaces } from './utils/strings';
import { isValidCountryCode } from './parsers/country';
import { parseZipCode } from './parsers/zip-code';
import { getStateInfo } from './parsers/state';
import { usLine2Prefixes, validateUsLine2Type } from './parsers/line2';
import { getLastElement } from './utils/array';
import { parsePlaceName } from './parsers/city-state';
import { matchesPOBox, parsePOBox } from './parsers/po-box';
import { matchesStreetAddress, parseStreetAddress } from './parsers/street-address';
import { matchesNoSuffix, parseNoSuffix } from './parsers/no-suffix';
import { ParsedAddress } from './model/parsed-address';

export const parseAddress = function (address: string): ParsedAddress {
    if (!address) {
        throw new Error('parseAddress: Argument must be a non-empty string.');
    }

    // Split the address by given delimiters, remove extraneous ones.
    let addressParts = address.split(/,|\t|\n/).map(removeRepeatedSpaces).filter((s) => !!s);

    // Check if the last section contains country reference (Just supports US/Canada for now)
    const countrySection = getLastElement(addressParts)?.trim();

    // If it does, remove it
    // TODO: Add the country code to the return
    if (isValidCountryCode(countrySection)) {
        addressParts = addressParts.slice(0, -1);
    }

    // Assume the last address section contains state, zip or both
    const stateZipString = getLastElement(addressParts)?.trim();
    const zipCode = parseZipCode(stateZipString);
    const resultZipCode = zipCode?.zip5 || zipCode?.zipInternational;
    let resultZip4: string | undefined;

    if (zipCode?.zip5 && zipCode.zip4) {
        resultZip4 = `${zipCode.zip5}-${zipCode.zip4}`;
    }

    let cityStateString = zipCode?.trimmedString;

    // Parse and remove state
    if (cityStateString && cityStateString.length > 0) { // Check if anything is left of last section
        addressParts[addressParts.length - 1] = cityStateString;
    } else {
        addressParts.splice(-1, 1);
        cityStateString = addressParts[addressParts.length - 1].trim();
    }

    const stateInfo = getStateInfo(cityStateString);
    const resultStateAbbreviation = stateInfo.stateAbbreviation;
    const resultStateName = stateInfo.stateName;
    const cityString = stateInfo.trimmedString;

    if (!resultStateAbbreviation || !resultStateName || resultStateAbbreviation.length != 2) {
        throw new Error('Can not parse address. State not found.');
    }
    

    // Parse and remove city/place name
    let placeString: string | undefined;

    if (cityString && cityString.length > 0) {
        addressParts[addressParts.length - 1] = cityString;
        placeString = getLastElement(addressParts);
    } else {
        addressParts.splice(-1, 1);
        placeString = addressParts[addressParts.length - 1].trim();
    }

    const placeNameResult = parsePlaceName(placeString, resultStateAbbreviation);
    const resultPlaceName = placeNameResult.placeName;
    
    if (!resultPlaceName) {
        throw new Error('No Place Name Specified');
    }

    placeString = placeNameResult.placeString;

    // Parse the street data
    let streetString: string | undefined;

    if (placeString && placeString.length > 0) {
        addressParts[addressParts.length - 1] = placeString;
    } else {
        addressParts = addressParts.slice(0, -1);
    }

    let temporaryLine2: string | undefined;

    if (addressParts.length > 2) {
        throw new Error('Can not parse address. More than two address lines.');
    } else if (addressParts.length === 2) {
        // check if the secondary data is first
        const line2Index = addressParts.findIndex((part) => {
            const firstWord = part.substring(0, part.indexOf(' '));
            return !!usLine2Prefixes[firstWord];
        });

        const part = addressParts.splice(line2Index, 1)[0];

        temporaryLine2 = part.trim();
    }

    if (addressParts.length === 0) {
        throw new Error('Can not parse address. Invalid street address data. Input string: ' + address);
    }

    streetString = addressParts[0].trim();

    if (!temporaryLine2) {
        const line2Type = validateUsLine2Type(streetString);
        if (line2Type) {
            const upperSS = streetString.toUpperCase();

            const idx = upperSS.indexOf(line2Type);
            temporaryLine2 = streetString.substring(idx);
            streetString = streetString.replace(temporaryLine2, "").trim();
        }
    }

    let resultAddressLine1: string | undefined;
    let resultStreetNumber: string | undefined;
    let resultStreetName: string | undefined;
    let resultStreetDirection: string | undefined;
    let resultStreetSuffix: string | undefined;
    let resultAddressLine2: string | undefined = temporaryLine2;

    if (matchesPOBox(streetString)) {
        const res = parsePOBox(streetString);
        streetString = res.streetString;
        resultAddressLine1 = res.line1;
    } else if (matchesStreetAddress(streetString)) {
        const res = parseStreetAddress(streetString);
        resultAddressLine1 = res.line1;
        resultStreetNumber = res.streetNumber;
        resultStreetName = res.streetName;
        resultStreetDirection = res.streetDirection;
        resultStreetSuffix = res.streetSuffix;
        streetString = res.streetString;
        resultAddressLine2 ||= res.line2;
    } else if (matchesNoSuffix(streetString)) {
        const res = parseNoSuffix(streetString);
        resultAddressLine1 = res.line1;
        resultAddressLine2 = res.line2;
        resultStreetName = res.streetName;
        resultStreetNumber = res.streetNumber;
        streetString = res.streetString;
        resultAddressLine2 ||= res.line2;
    } else {
        throw new Error('Can not parse address. Invalid street address data. Input string: ' + address);
    }

    if (!resultAddressLine1) {
        throw new Error('Could not generate Address Line 1');
    }

    let addressString = resultAddressLine1;
    if (resultAddressLine2) {
        addressString += ', ' + resultAddressLine2;
    }

    let resultFormattedAddress: string | undefined;
    let resultId: string;

    if (addressString && resultPlaceName && resultStateAbbreviation) {
        const idString = addressString + ", " + resultPlaceName + ", " + resultStateAbbreviation + (resultZipCode ?  (" " + resultZipCode) : '');
        resultFormattedAddress = idString;
        resultId = encodeURI(idString.replace(/[\s#/.,]+/g, '-').toLowerCase());
    } else {
        throw new Error('Required Address Parts Not Found.');
    }

    return {
        zipCode: resultZipCode,
        zipCodePlusFour: resultZip4,
        stateAbbreviation: resultStateAbbreviation,
        stateName: resultStateName,
        placeName: resultPlaceName,
        addressLine1: resultAddressLine1,
        addressLine2: resultAddressLine2,
        streetNumber: resultStreetNumber,
        streetSuffix: resultStreetSuffix,
        streetDirection: resultStreetDirection,
        streetName: resultStreetName,
        id: resultId,
        formattedAddress: resultFormattedAddress,
    }
};
