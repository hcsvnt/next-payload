import type { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { buildLabels } from '@/static';

export const Media: CollectionConfig = {
    slug: 'media',
    labels: buildLabels({
        singular: {
            en: 'Media',
            de: 'Medien',
            pl: 'Media',
            es: 'Medios'
        },
        plural: {
            en: 'Media',
            de: 'Medien',
            pl: 'Media',
            es: 'Medios'
        }
    }),
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true
        }
    ],
    upload: {
        disableLocalStorage: true,
        mimeTypes: ['image/*', 'video/*']
    }
};
