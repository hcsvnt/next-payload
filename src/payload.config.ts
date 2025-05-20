import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { de } from '@payloadcms/translations/languages/de';
import { en } from '@payloadcms/translations/languages/en';
import { es } from '@payloadcms/translations/languages/es';
import { pl } from '@payloadcms/translations/languages/pl';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// storage-adapter-import-placeholder
import type { Mutable } from '@/types';

import { DEFAULT_LOCALE, LOCALES } from '@/static';

import { Categories } from './collections/Categories';
import { Images } from './collections/Images';
import { News } from './collections/News';
import { Pages } from './collections/Pages';
import { ThirdPartyAccess } from './collections/ThridPartyAccess';
import { Users } from './collections/Users';
import { Footer } from './globals/Footer/footer';
import { Header } from './globals/Header/header';
import { plugins } from './payload.plugins';
import { getServerURL } from './utils/getServerURL';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    /**
     * Data Model
     */
    globals: [Header, Footer],
    collections: [Pages, News, Categories, Images, Users, ThirdPartyAccess],
    /**
     * General Configuration
     */
    serverURL: getServerURL(),
    secret: process.env.PAYLOAD_SECRET || '',
    editor: lexicalEditor(),
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
        connectOptions: {
            dbName: 'next-payload'
        }
    }),
    /**
     * Email
     */
    email: nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_USER || '',
        defaultFromName: 'Huncwot Payload CMS',
        transportOptions: {
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        }
    }),
    // defaultDepth: 10,
    // maxDepth: 20,
    /**
     * Languages
     */
    i18n: { supportedLanguages: { en, de, pl, es } },
    localization: {
        locales: LOCALES as Mutable<typeof LOCALES>,
        defaultLocale: DEFAULT_LOCALE.code
    },
    /**
     * Custom Admin Panel
     */

    admin: {
        // avatar: 'default', // instead of the ugly blue 'gravatar'
        avatar: {
            Component: '/components/HuncwotLogo/HuncwotLogo'
        },
        components: {
            graphics: {
                Logo: {
                    path: '/components/HuncwotLogo/HuncwotLogo',
                    serverProps: {
                        isAvatar: false
                    }
                }
            }
        },
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname)
        }
    },
    /**
     * More Configuration
     */
    typescript: {
        outputFile: path.resolve(dirname, 'payload.types.ts')
    },
    upload: {
        limits: {
            fileSize: 10485760 // 10MB
        }
    },
    graphQL: {
        disable: true
    },
    plugins,
    sharp,
    /**
     * Security
     */
    cors: {
        origins: '*'
        // headers?: string[];
    },
    csrf: [
        // '*'
        // `config.serverURL` is added by default if defined
    ]
});
