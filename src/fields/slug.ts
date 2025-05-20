import type { Field } from 'payload';

export const slug: Field = {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    hooks: {
        beforeValidate: [
            ({ value }) =>
                value
                    ?.replace(/ /g, '-')
                    .replace(/[^\w-]+/g, '')
                    .toLowerCase()
        ]
    }
};
