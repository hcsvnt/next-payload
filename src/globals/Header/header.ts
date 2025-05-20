import type { GlobalConfig } from 'payload';

export const Header: GlobalConfig = {
    slug: 'header',
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            defaultValue: 'Huncwot',
            localized: true,
            required: true
        },
        {
            name: 'show_locale_selector',
            label: 'Show Locale Selector',
            type: 'checkbox',
            defaultValue: true
        },
        {
            name: 'menu',
            label: 'Menu',
            type: 'group',
            fields: [
                {
                    name: 'show_nav',
                    label: 'Show Navigation',
                    type: 'checkbox',
                    defaultValue: true
                },
                {
                    name: 'navigation',
                    label: 'Navigation',
                    type: 'array',
                    minRows: 1,
                    admin: {
                        condition: (_, siblingData) => siblingData['show_nav']
                    },
                    fields: [
                        {
                            name: 'label',
                            label: 'Label',
                            type: 'text',
                            required: true
                        },
                        {
                            name: 'link',
                            label: 'Link',
                            type: 'text',
                            required: true
                        }
                    ]
                }
            ]
        }
    ]
};
