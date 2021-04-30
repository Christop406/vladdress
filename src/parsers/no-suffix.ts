import { usLine2Prefixes } from "./line2";

const reNoSuffix = /\b\d+\s[a-zA-Z0-9_\s]+\b/i;

export const matchesNoSuffix = (input: string | undefined): boolean => {
    return !!input && reNoSuffix.test(input);
};

interface ParseNoSuffixResult {
    line1: string | undefined;
    line2: string | undefined;
    streetName: string | undefined;
    streetNumber: string | undefined;
    streetString: string | undefined;
}

export const parseNoSuffix = (streetString: string | undefined): ParseNoSuffixResult => {
    let resultAddressLine2: string | undefined;
    let resultStreetNumber: string | undefined;
    let resultStreetName: string | undefined;
    const resultAddressLine1 = streetString?.match(reNoSuffix)?.[0];

    const reLine2 = new RegExp('\\s(' + Object.keys(usLine2Prefixes).join('|') + ')\\.?\\s[a-zA-Z0-9_-]+$', 'i');
    if (streetString?.match(reLine2)) {
        resultAddressLine2 = streetString.match(reLine2)?.[0].trim();
        streetString = streetString.replace(reLine2, "").trim(); // Carve off the first address line
    }

    streetString = streetString?.replace(reNoSuffix, "").trim(); // Carve off the first address line
    const streetParts = resultAddressLine1?.split(' ');

    // Assume type is last and number is first   
    if (streetParts) {
        resultStreetNumber = streetParts[0]; // Assume number is first element
        streetParts.shift(); // Remove the first element
        resultStreetName = streetParts.join(' '); // Assume street name is everything else
    }

    return {
        line1: resultAddressLine1,
        line2: resultAddressLine2,
        streetName: resultStreetName,
        streetNumber: resultStreetNumber,
        streetString,
    };
};
