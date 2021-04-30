interface ParsePOBoxResult {
    line1: string | undefined;
    streetString: string | undefined;
}

const poBoxRegex = /(P\.?O\.?|POST\s+OFFICE)\s+(BOX|DRAWER)\s\w+/i;

export const parsePOBox = (streetString: string | undefined): ParsePOBoxResult => {
    const line1 = streetString?.match(poBoxRegex)?.[0];
    streetString = streetString?.replace(poBoxRegex, '').trim(); // Carve off the first address line

    return { line1, streetString };
};

export const matchesPOBox = (input: string | undefined): boolean => {
    return !!input && poBoxRegex.test(input);
};