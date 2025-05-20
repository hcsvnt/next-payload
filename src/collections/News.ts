import type { CollectionConfig } from 'payload';

// import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';
import { lexicalHTML } from '@payloadcms/richtext-lexical';

import { authenticated } from '@/access/authenticated';
import { defaultLexical } from '@/fields/defaultLexical';
import { buildLabels } from '@/static';

export const News: CollectionConfig<'news'> = {
    slug: 'news',
    labels: buildLabels({
        singular: {
            en: 'News',
            de: 'Nachricht',
            pl: 'Wiadomość',
            es: 'Noticias'
        },
        plural: {
            en: 'News',
            de: 'Nachrichten',
            pl: 'Wiadomości',
            es: 'Noticias'
        }
    }),
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticated,
        update: authenticated
    },
    // admin: {
    // defaultColumns: ['title', 'slug', 'updatedAt']
    // },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true
        },
        {
            name: 'hero_image',
            type: 'relationship',
            relationTo: 'images'
        },
        {
            name: 'content',
            type: 'richText',
            editor: defaultLexical,
            label: 'Content',
            localized: true
        },
        lexicalHTML('content', { name: 'content_html' }),
        {
            name: 'published_at',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime'
                },
                position: 'sidebar'
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date();
                        }
                        return value;
                    }
                ]
            }
        }
    ],
    hooks: {
        // todo?
        // afterChange: [revalidatePost],
        // afterRead: [populateAuthors],
        // afterDelete: [revalidateDelete]
    },
    versions: {
        drafts: {
            autosave: {
                interval: 100
            },
            schedulePublish: true
        },
        maxPerDoc: 50
    }
};
