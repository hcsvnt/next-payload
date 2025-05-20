import type { Block } from 'payload';

import { lexicalHTML } from '@payloadcms/richtext-lexical';

import { defaultLexical } from '@/fields/defaultLexical';
import { link } from '@/fields/link';

export const Intro: Block = {
    slug: 'intro_block',
    interfaceName: 'IntroBlock', // generate an interface for this block, hell yeah!
    labels: {
        plural: 'Intros',
        singular: 'Intro'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            required: true,
            localized: true
        },
        link('test_link'),
        {
            name: 'content',
            type: 'richText',
            editor: defaultLexical,
            label: 'Content - not localized'
        },
        lexicalHTML('content', { name: 'content_html' }),
        {
            name: 'content_localized',
            type: 'richText',
            editor: defaultLexical,
            label: 'Content - localized',
            localized: true
        },
        lexicalHTML('content_localized', { name: 'content_localized_html' })
    ]
};
