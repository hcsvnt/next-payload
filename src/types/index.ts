/**
 * Makes all properties in T mutable.
 * Useful for removing readonly modifier from properties on objects (or arrays) created `as const`.
 */
export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
