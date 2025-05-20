import type { GlobalConfig } from 'payload';

import { defaultLexical } from '@/fields/defaultLexical';

export const Footer: GlobalConfig = {
    slug: 'footer',
    access: {
        read: () => true
    },
    fields: [
        { name: 'title', label: 'Title', type: 'text', localized: true, required: true },
        {
            name: 'disclaimer',
            type: 'richText',
            editor: defaultLexical,
            label: 'Disclaimer',
            localized: true
        }
    ]
};
