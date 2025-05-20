export function isEmpty(obj: object): boolean {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}
