import type { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { buildLabels } from '@/static';

export const Images: CollectionConfig = {
    slug: 'images',
    labels: buildLabels({
        singular: {
            en: 'Image',
            de: 'Bild',
            pl: 'Obraz',
            es: 'Imagen'
        },
        plural: {
            en: 'Images',
            de: 'Bilder',
            pl: 'Obrazy',
            es: 'Imágenes'
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
        mimeTypes: ['image/*'],
        adminThumbnail: 'thumbnail',
        disableLocalStorage: true,
        crop: true,
        focalPoint: true,
        imageSizes: [
            {
                name: 'thumbnail',
                width: 300,
                generateImageName
            },
            {
                name: 'square',
                width: 800,
                height: 800,
                generateImageName
            }
        ],
        resizeOptions: {
            width: 4096, // 4k max
            withoutEnlargement: true
        }
    }
};

// todo?

function generateImageName({
    originalName,
    sizeName,
    extension
    // width,
    // height
}: {
    originalName: string;
    sizeName: string;
    extension: string;
    width: number;
    height: number;
}) {
    return `${originalName}-${sizeName}.${extension}`;
}
