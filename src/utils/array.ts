export const getLastElement = <T = unknown>(array: T[]): T | undefined => {
    return array[array.length - 1];
};