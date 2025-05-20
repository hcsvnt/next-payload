// import { redirectsPlugin } from '@payloadcms/plugin-redirects';
// import { seoPlugin } from '@payloadcms/plugin-seo';
import { uploadthingStorage } from '@payloadcms/storage-uploadthing';

/**
 * Plugins:
 * - TODO redirectsPlugin: Enables Redirects
 * - TODO seoPlugin: Adds SEO fields to collections
 * - uploadthingStorage: Enables UploadThing Storage
 */

export const plugins = [
    uploadthingStorage({
        collections: {
            images: true
        },
        options: {
            token: process.env.UPLOADTHING_TOKEN,
            acl: 'public-read'
        }
    })
    // seoPlugin({
    //     collections: ['pages'],
    //     uploadsCollection: 'images',
    //     generateTitle: ({ doc }) => `${process.env.SEO_TITLE} — ${doc.title}`,
    //     generateDescription: ({ doc }) => doc.title
    //     // fields: ({ defaultFields }) => [
    //     //     ...defaultFields,
    //     //     {
    //     //         name: 'customField',
    //     //         type: 'text'
    //     //     }
    //     // ]
    // })
];
