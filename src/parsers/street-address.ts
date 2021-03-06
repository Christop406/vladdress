import { replaceCaseInsensitive, toTitleCase } from "../utils/strings";
import * as usStreetTypes from '../data/us/street-types.json';

export const streetAddressRegex = /^(?<streetNum>(?:\d+\w*|\w*\d+)?)?\s*(?<streetName>.+)$/i;

export const matchesStreetAddress = (input: string | undefined): boolean => {
    return !!input && streetAddressRegex.test(input);
};

export const matchStreetAddress = (input: string | undefined): RegExpMatchArray | null => {
    return input?.match(streetAddressRegex) || null;
}

const usStreetDirectional = {
    north: "N",
    northeast: "NE",
    east: "E",
    southeast: "SE",
    south: "S",
    southwest: "SW",
    west: "W",
    northwest: "NW",
};

interface ParseStreetAddressResult {
    streetName: string | undefined;
    line1: string | undefined;
    line2: string | undefined;
    streetDirection: string | undefined;
    streetSuffix: string | undefined;
    streetNumber: string | undefined;
    streetString: string | undefined;
}

export const parseStreetAddress = (streetString: string | undefined): ParseStreetAddressResult => {
    if (!streetString) {
        throw new Error('No Street String Passed to parseStreetAddress');
    }
    
    const match = matchStreetAddress(streetString);

    let resultStreetName: string | undefined;
    let resultAddressLine1: string | undefined;
    let resultAddressLine2: string | undefined;
    let resultStreetDirection: string | undefined;
    let resultStreetSuffix: string | undefined;
    let resultStreetNumber: string | undefined;

    if (match) {
        let fullStreetName = match.groups?.streetName;

        if (fullStreetName && /\w\s+ave(?:nue)?.?\s\w/i.test(fullStreetName)) {
            resultStreetName = replaceCaseInsensitive(fullStreetName, 'avenue', true, 'Ave')?.replace(/\./g, '');
        } else {
            resultAddressLine1 = match[0];

            streetString = streetString.replace(resultAddressLine1, "").trim(); // Carve off the first address line

            if (streetString && streetString.length > 0) {
                // Check if line2 data was already parsed
                if (resultAddressLine2 && resultAddressLine2.length > 0) {
                    throw new Error('Can not parse address. Too many address lines.');
                } else {
                    resultAddressLine2 = streetString;
                }
            }

            const streetParts = resultAddressLine1.split(' ');

            // Check if directional is last element

            const uppercaseLine1 = resultAddressLine1.toUpperCase();
            const direction = Object.keys(usStreetDirectional).find((key) => {
                return uppercaseLine1.endsWith(' ' + usStreetDirectional[key]) || uppercaseLine1.endsWith(' ' + key.toUpperCase());
            })

            if (direction) {
                resultStreetDirection = usStreetDirectional[direction];
                streetParts.pop();
            }

            // If there are only 2 street parts (number and name) then its likely missing a "real" suffix and the street name just happened to match a suffix
            if (streetParts.length > 2) {
                // Remove '.' if it follows streetSuffix
                const originalStreetType = streetParts[streetParts.length - 1];
                streetParts[streetParts.length - 1] = originalStreetType.replace(/\.$/, '');
                const lowercaseStreetType = streetParts[streetParts.length - 1].toLowerCase();
                const streetType = usStreetTypes[lowercaseStreetType];

                if (streetType) {
                    resultStreetSuffix = toTitleCase(streetType.toLowerCase());
                    fullStreetName = replaceCaseInsensitive(fullStreetName, originalStreetType, true);
                }
            }

            resultStreetName = fullStreetName?.trim(); // Assume street name is everything in the middle
            const lowercaseStreetName = resultStreetName?.toLowerCase();
            if (direction && resultStreetName) {
                resultStreetName = resultStreetName?.replace(/\s\w+$/, '').trim();
            }

            if (lowercaseStreetName && !resultStreetSuffix) {
                const foundEnding = Object.keys(usStreetTypes).find((type) => {
                    return lowercaseStreetName.endsWith(' ' + type);
                });

                if (foundEnding) {
                    resultStreetName = resultStreetName?.substring(0, resultStreetName.length - foundEnding.length).trim();
                }
            }
        }

        resultStreetName = toTitleCase(resultStreetName || '')
            .replace('Fm', 'FM');
        resultStreetNumber = match.groups?.streetNum;
        resultAddressLine1 = [resultStreetNumber, resultStreetName, resultStreetSuffix, resultStreetDirection].filter((s) => !!s).join(" ");
    }

    return {
        streetName: resultStreetName,
        line1: resultAddressLine1,
        line2: resultAddressLine2,
        streetDirection: resultStreetDirection,
        streetSuffix: resultStreetSuffix,
        streetNumber: resultStreetNumber,
        streetString,
    };
};