/**
 * Get the URL of the current environment from Vercel environment variables.
 * These don't include the protocol, so you'll need to add that yourself.
 * This only works Sever Side!
 * @returns The URL of the current environment or undefined.
 * @example
 * ```ts
 * const url = getVercelURL() ? `https://${getVercelURL()}` : 'http://localhost:3000';
 * ```
 *
 */
export function getVercelURL() {
    if (process.env.VERCEL_ENV === 'production') {
        return process.env.VERCEL_PROJECT_PRODUCTION_URL;
    }

    return process.env.VERCEL_BRANCH_URL;
}
