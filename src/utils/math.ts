export const compactNotation = (number: number) =>
    Intl.NumberFormat('en-US', { notation: 'compact' }).format(number);

export const mToKm2 = (m: number) => m / 1000000;

export const toFixed = (num: number, digits: number): number => Number(num.toFixed(digits));
// preseves trailing zeros that get lost in type conversion

export const toFixedString = (num: number, digits: number): string => num.toFixed(digits);

export const toNearest = (num: number, nearest: number): number =>
    Math.round(num / nearest) * nearest;

export const toNearestCeil = (num: number, nearest: number): number =>
    Math.ceil(num / nearest) * nearest;

export const toNearestFloor = (num: number, nearest: number): number =>
    Math.floor(num / nearest) * nearest;

export const compactNumber = (
    number: number,
    options?: {
        maximumFractionDigits?: number;
        minimumFractionDigits?: number;
    }
) => Intl.NumberFormat('en-US', { notation: 'compact', ...options }).format(number);

export function formatFilesize(bytes: number) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${toFixed(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
}
