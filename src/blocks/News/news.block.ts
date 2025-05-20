import type { Block } from 'payload';

export const News: Block = {
    slug: 'news_block',
    interfaceName: 'NewsBlock', // generate an interface for this block, hell yeah!
    labels: {
        plural: 'News',
        singular: 'News'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            required: true,
            localized: true,
            defaultValue: 'News'
        },
        {
            name: 'news',
            type: 'relationship',
            relationTo: 'news',
            hasMany: true,
            required: true
        }
    ]
};
