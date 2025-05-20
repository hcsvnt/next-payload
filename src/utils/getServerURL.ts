/**
 * Get the URL of the current environment.
 *
 * This function determines the URL based on the following conditions:
 * - If running on Vercel in production, it uses the `VERCEL_PROJECT_PRODUCTION_URL` environment variable.
 * - If running on a Vercel branch deployment, it uses the `VERCEL_BRANCH_URL` environment variable.
 * - If the `SERVER_URL` environment variable contains "localhost", it returns the URL with the `http` protocol.
 * - Otherwise, it defaults to using the `SERVER_URL` environment variable with the `https` protocol.
 *
 * Note: This function only works on the server side.
 *
 * @returns The URL of the current environment as a string, or `undefined` if no URL is configured.
 *
 * @example
 * ```ts
 * const url = getServerURL();
 * console.log(url); // Outputs the environment-specific URL or undefined
 * ```
 */
export function getServerURL() {
    if (process.env.VERCEL_ENV === 'production') {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    if (process.env.VERCEL_BRANCH_URL) {
        return `https://${process.env.VERCEL_BRANCH_URL}`;
    }

    if (process.env.SERVER_URL?.includes('localhost')) {
        return `http://${process.env.SERVER_URL}`;
    }

    return `https://${process.env.SERVER_URL}`;
}
