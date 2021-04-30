export function isValidCountryCode(inputString: string | undefined): boolean {
    return !!inputString && ['US', 'USA', 'United States', 'Canada'].includes(inputString);
}