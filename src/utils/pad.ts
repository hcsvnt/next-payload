export const pad = (num: number, width: number, z?: string) => {
    const newZ = z || '0';
    const n = `${num}`;
    return n.length >= width ? n : new Array(width - n.length + 1).join(newZ) + n;
};
