
interface ParseZipCodeResult {
    zip5?: string;
    zip4?: string;
    zipInternational?: string;
    originalInput: string;
    trimmedString: string;
}

/**
 * Parses ZIP/Postal Codes in these forms:
 * 
 * - `#####` (US ZIP Code - 5 Digit)
 * - `#####-####` (US ZIP Code - 5 + 4 Digit)
 * - `A1A-1A1`/`A1A1A1`/`"A1A 1A1"` (Canadian Zip Code)
 * 
 * The input to this function should **end** with the ZIP code to process.
 * Other cases are not yet supported. For example:
 * @example
 * 
 * parseZipCode('1 Main Street, San Diego CA 92115')
 * 
 * @param input 
 * @returns 
 */
export function parseZipCode(input: string | undefined): ParseZipCodeResult | undefined {
    input = input?.trim();

    if (!input) {
        return undefined;
    }

    const match = input.match(/(?<zip5>\d{5})-?(?:(?<zip4>\d{4}))?$/);

    console.log(match);

    if (match && !match?.groups) {
        return {
            originalInput: input,
            trimmedString: input.trim(),
        };
    }

    const { zip4, zip5 } = match?.groups || {};
    // let zipInternational: string | undefined;

    if (!zip5) {
        const match = input.match(/[A-Z]\d[A-Z][\s-]?\d[A-Z]\d/);

        if (!match) {
            return {
                originalInput: input,
                trimmedString: input.trim(),
            };
        }

        const [fullMatch] = match;

        if (!fullMatch) {
            return {
                originalInput: input,
                trimmedString: input.trim(),
            };
        }

        return {
            zipInternational: fullMatch,
            originalInput: input,
            trimmedString: input
                .replace(fullMatch, '')
                .trim()
        };

    }

    const totalMatchLength = match?.[0].length || 0;

    return {
        zip4,
        zip5,
        originalInput: input,
        trimmedString: input
            .substring(0, input.length - totalMatchLength)
            .trim(),
    };
}