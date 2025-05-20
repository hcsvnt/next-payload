export const LOCALES = [
    { label: 'English', code: 'en-US', code_short: 'en' },
    { label: 'German', code: 'de-DE', code_short: 'de' },
    { label: 'Polish', code: 'pl-PL', code_short: 'pl' },
    { label: 'Spanish', code: 'es-ES', code_short: 'es' }
] as const;

export const [DEFAULT_LOCALE] = LOCALES;

export type Labels = {
    singular: LabelSet;
    plural: LabelSet;
};
export type LabelSet = {
    [key in LocaleCodeShort]: string;
};
export type Locale = (typeof LOCALES)[number];
export type LocaleCode = (typeof LOCALES)[number]['code'];

export const BREAKPOINTS = [
    {
        label: 'Mobile',
        name: 'mobile',
        width: 375,
        height: 667
    },
    {
        label: 'Tablet',
        name: 'tablet',
        width: 768,
        height: 1024
    },
    {
        label: 'Desktop',
        name: 'desktop',
        width: 1280,
        height: 800
    }
] as const;
export type LocaleCodeShort = (typeof LOCALES)[number]['code_short'];

// todo: should this stay here?

/**
 * Build a set of labels for a collection while ensuring that all used locales are accounted for.
 * @param labels - The labels for the collection in each locale (en, de, pl, es; singular, plural).
 * @returns The labels for the collection.
 * @example
 * buildLabels({
 *  singular: {
 *      en: 'Page',
 *      de: 'Seite',
 *      pl: 'Strona',
 *      es: 'Página'
 *  },
 *  plural: {
 *      en: 'Pages',
 *      de: 'Seiten',
 *      pl: 'Strony',
 *      es: 'Páginas'
 *  }
 * });
 */
export function buildLabels({ singular, plural }: Labels): Labels {
    return {
        singular: buildLabelSet(singular),
        plural: buildLabelSet(plural)
    };
}

/**
 *  Build a LabelSet - either singular or plural - ensuring that all used locales are accounted for.
 * @param labels - The labels for the collection in each locale (en, de, pl, es).
 * @returns The labels for the collection.
 * @example
 * buildLabelSet({
 *  en: 'Page',
 *  de: 'Seite',
 *  pl: 'Strona',
 *  es: 'Página'
 * });
 */
function buildLabelSet(labels: LabelSet): LabelSet {
    return LOCALES.reduce((acc, { code_short }) => {
        acc[code_short] = labels[code_short] || '';
        return acc;
    }, {} as LabelSet);
}
