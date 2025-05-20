import type { Block } from 'payload';

/**
 * The news field is an example of an automatically populated relationship field.
 */

export const LatestNews: Block = {
    slug: 'latest_news_block',
    interfaceName: 'LatestNewsBlock',
    labels: {
        plural: 'Lates News',
        singular: 'Latest News'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            required: true,
            localized: true,
            defaultValue: 'Latest News'
        },
        {
            name: 'count',
            type: 'number',
            label: 'Count',
            required: true,
            defaultValue: 3,
            min: 1
        },
        {
            name: 'news',
            type: 'relationship',
            relationTo: 'news',
            hasMany: true,
            required: false,
            admin: {
                hidden: true
            },
            hooks: {
                afterRead: [
                    async ({ req, siblingData }) =>
                        (
                            await req.payload.find({
                                collection: 'news',
                                sort: '-createdAt',
                                limit: siblingData.count
                            })
                        ).docs
                ]
            }
        }
    ]
};
