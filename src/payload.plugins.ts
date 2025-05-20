// import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { seoPlugin } from '@payloadcms/plugin-seo';
// import { s3Storage } from '@payloadcms/storage-s3';
import { uploadthingStorage } from '@payloadcms/storage-uploadthing';

/**
 * Plugins:
 * - payloadCloudPlugin: Enables Payload Cloud
 * - redirectsPlugin: Enables Redirects
 * - seoPlugin: Adds SEO fields to collections
 * - s3Storage: Enables S3 Storage
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
    }),
    seoPlugin({
        collections: ['pages'],
        uploadsCollection: 'images',
        generateTitle: ({ doc }) => `${process.env.SEO_TITLE} — ${doc.title}`,
        generateDescription: ({ doc }) => doc.title
        // fields: ({ defaultFields }) => [
        //     ...defaultFields,
        //     {
        //         name: 'customField',
        //         type: 'text'
        //     }
        // ]
    })
];

// todo

// // todo: this doesn't seem to catch the redirects
// redirectsPlugin({
//     collections: ['pages'],
//     redirectTypes: ['301', '302']
// }),

// s3Storage({
//     collections: {
//         media: true
//     },
//     bucket: process.env.S3_BUCKET || 'OOPS!',
//     config: {
//         credentials: {
//             accessKeyId: process.env.S3_ACCESS_KEY_ID || 'OOPS!',
//             secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'OOPS!'
//         },
//         region: process.env.S3_REGION
//     }
// }),
