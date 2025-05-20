import Image from 'next/image';

import type { MediaBlock } from '@/payload.types';

// todo: this could use some love

export default function MediaBlock({ id, media }: MediaBlock) {
    if (!id) {
        return <p>Missing Block ID</p>;
    }

    if (isIdNotContent(media)) {
        return <NotContent id={id} />;
    }

    const { alt, mimeType, url, width, height } = media;

    if (!url || !alt || !mimeType || !width || !height) {
        return <p>Missing Media Attributes</p>;
    }

    return (
        <div style={{ padding: 'var(--padding);' }}>
            {mimeType?.includes('image') ? (
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                    }}
                    src={url}
                    alt={alt}
                    width={width}
                    height={height}
                />
            ) : (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video controls>
                    <source src={url} />
                </video>
            )}
            <p>{alt}</p>
        </div>
    );
}

// todo: these could potentially be useful elsewhere
const isIdNotContent = (content: unknown) => typeof content === 'string';
const NotContent = ({ id }: { id: string }) => (
    <div style={{ padding: 'var(--padding);' }}>
        Can't access {id}, please check:
        <ul>
            <li>if queried document still exists</li>
            <li>query depth</li>
            <li>permissions</li>
        </ul>
    </div>
);
