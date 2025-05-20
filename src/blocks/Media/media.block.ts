import type { Block } from 'payload';

export const Media: Block = {
    slug: 'media_block',
    interfaceName: 'MediaBlock',
    labels: {
        plural: 'Media',
        singular: 'Media'
    },
    fields: [
        {
            name: 'media',
            type: 'relationship',
            relationTo: 'images',
            hasMany: false,
            required: true
        }
    ]
};
