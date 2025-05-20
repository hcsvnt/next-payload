import type { Field } from 'payload';

/**
 * Function to generate a link field that can be used to create internal or
 * external links with the option to open in a new tab and a custom field name
 * to avoid conflicts or allow multiple entities.
 * @param name The name of the field
 * @returns Field
 */

export const link = (name: string = 'link'): Field => ({
    name,
    type: 'group',
    fields: [
        {
            name: 'label',
            type: 'text',
            required: true
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'newTab',
                    type: 'checkbox',
                    label: 'Open in new tab'
                },
                {
                    name: 'type',
                    type: 'radio',
                    defaultValue: 'internal',
                    options: [
                        {
                            label: 'Internal',
                            value: 'internal'
                        },
                        {
                            label: 'External',
                            value: 'external'
                        }
                    ]
                }
            ]
        },
        {
            name: 'url',
            type: 'text',
            required: true,
            admin: {
                condition: (_, siblingData) => siblingData.type === 'external'
            }
        },
        {
            name: 'page',
            type: 'relationship',
            relationTo: 'pages',
            required: true,
            admin: {
                condition: (_, siblingData) => siblingData.type === 'internal'
            }
        }
    ]
});
