export function getKeyByValue(object: Record<string, unknown>, value: unknown): string | undefined {
    return Object.keys(object).find(key => object[key] === value);
}
