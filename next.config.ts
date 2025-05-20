import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';
import { withPayload } from '@payloadcms/next/withPayload';
import { pipe } from 'effect';

const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.ANALYZE_BUNDLE === 'true'
});

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js'
            }
        }
    },
    webpack(config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/ // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                // issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                                cleanupIds: false
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            // Geojson
            {
                test: /\.geojson$/i,
                use: 'json-loader'
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;
        return config;
    },
    images: {
        localPatterns: [
            {
                pathname: 'src/assets/images/**'
            }
        ],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost'
            }
            // TODO: add patterns to use external image sources
        ],
        formats: ['image/avif', 'image/webp']
    },
    pageExtensions: ['ts', 'tsx'] // add 'md', 'mdx', if needed (may not work with turbopack)
};

// see: https://nextjs.org/docs/app/building-your-application/configuring/mdx
// const withMDX = createMDX({
//     extension: /\.(md|mdx)$/,
//     // Add markdown plugins here, as desired
//     options: {
//         rehypePlugins: [rehypeSlug]
//     }
// });

export default pipe(nextConfig, withPayload, withBundleAnalyzer);
