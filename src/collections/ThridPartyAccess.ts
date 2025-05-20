import type { CollectionConfig } from 'payload';

import { buildLabels } from '@/static';

export const ThirdPartyAccess: CollectionConfig = {
    slug: 'third-party-access',
    labels: buildLabels({
        singular: {
            en: 'Third Party Access',
            de: 'Drittanbieterzugriff',
            pl: 'Dostęp aplilacji zewnętrznych',
            es: 'Acceso de terceros'
        },
        plural: {
            en: 'Third Party Access',
            de: 'Drittanbieterzugriffe',
            pl: 'Dostęp aplikacji zewnętrznych',
            es: 'Acceso de terceros'
        }
    }),
    auth: {
        useAPIKey: true
    },
    fields: []
};
