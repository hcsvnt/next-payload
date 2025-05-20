import type { CollectionConfig } from 'payload';

import { authenticated } from '@/access/authenticated';
import { buildLabels } from '@/static';
import { getServerURL } from '@/utils/getServerURL';

export const Users: CollectionConfig = {
    slug: 'users',
    labels: buildLabels({
        singular: {
            en: 'User',
            de: 'Benutzer',
            pl: 'Użytkownik',
            es: 'Usuario'
        },
        plural: {
            en: 'Users',
            de: 'Benutzer',
            pl: 'Użytkownicy',
            es: 'Usuarios'
        }
    }),
    access: {
        admin: authenticated,
        create: authenticated,
        delete: authenticated,
        read: authenticated,
        update: authenticated
    },
    admin: {
        defaultColumns: ['name', 'email'],
        useAsTitle: 'name'
    },
    auth: {
        useAPIKey: false,
        cookies: {
            sameSite: 'None',
            secure: !getServerURL().includes('localhost') // secure cookies in production only
        }
    },
    fields: [
        {
            name: 'name',
            type: 'text'
        }
    ],
    timestamps: true
};
