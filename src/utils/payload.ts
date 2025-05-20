export function formatSlug(slug: string) {
    const [first, ...rest] = slug.trim().toLowerCase().split('');
    return [first === '/' ? first : `/${first}`, ...rest].join('');
}
