import type { CollectionConfig } from 'payload';

import type { Mutable } from '@/types';

import { authenticated } from '@/access/authenticated';
import { Intro } from '@/blocks/Intro/intro.block';
import { Media } from '@/blocks/Media/media.block';
import { LatestNews } from '@/blocks/News/latest-news.block';
import { News } from '@/blocks/News/news.block';
import { slug } from '@/fields/slug';
import { BREAKPOINTS } from '@/static';
import { buildLabels } from '@/static';
import { getServerURL } from '@/utils/getServerURL';

import { populatePublishedAt } from './hooks/populatePublishedAt';
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage';

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    labels: buildLabels({
        // it's possible to pass labels in multiple languages
        singular: {
            en: 'Page',
            de: 'Seite',
            pl: 'Strona',
            es: 'Página'
        },
        plural: {
            en: 'Pages',
            de: 'Seiten',
            pl: 'Strony',
            es: 'Páginas'
        }
    }),
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticated,
        update: authenticated
    },
    // This config controls what's populated by default when a page is referenced
    // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
    // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
    // defaultPopulate: {
    //     title: true,
    //     slug: true
    // },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        useAsTitle: 'title',
        preview: (doc, { req, locale }) => {
            const draftSecret = process.env.DRAFT_SECRET;
            const params = new URLSearchParams();

            if (draftSecret) {
                params.append('draft', draftSecret);
            }

            return `${req.protocol}//${req.host}/${locale.toLowerCase()}/${doc.slug}?${params.toString()}`;
        },
        livePreview: {
            url: ({ data }) => {
                const baseURL = getServerURL();
                const draftSecret = process.env.DRAFT_SECRET;
                const params = new URLSearchParams();

                if (draftSecret) {
                    params.append('draft', draftSecret);
                }

                return `${baseURL}/${data.slug}?${params.toString()}`;
            },
            breakpoints: BREAKPOINTS as Mutable<typeof BREAKPOINTS>
        }
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        slug,
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'sections',
                            type: 'array',
                            required: true,
                            minRows: 1,
                            fields: [
                                {
                                    name: 'layout',
                                    type: 'blocks',
                                    blocks: [Intro, LatestNews, News, Media],
                                    required: true
                                    // admin: {
                                    // initCollapsed: true
                                    // }
                                }
                            ]
                        }
                    ]
                }
                // todo: add SEO fields
            ]
        },
        {
            name: 'published_at',
            type: 'date',
            admin: {
                position: 'sidebar'
            }
        }
    ],
    hooks: {
        beforeChange: [populatePublishedAt],
        afterChange: [revalidatePage],
        afterDelete: [revalidateDelete]
    },
    versions: {
        drafts: {
            autosave: { interval: 100 },
            schedulePublish: true
        },
        maxPerDoc: 50
    }
};
