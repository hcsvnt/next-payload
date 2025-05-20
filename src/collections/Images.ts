import type { CollectionConfig } from 'payload';

import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';

export const Images: CollectionConfig = {
    slug: 'images',
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
            width: 4096 // 4k max
        }
    }
};

// todo?

function generateImageName({
    originalName,
    height,
    sizeName,
    extension,
    width
}: {
    originalName: string;
    height: number;
    sizeName: string;
    extension: string;
    width: number;
}) {
    return `${originalName}-${sizeName}.${extension}`;
}
