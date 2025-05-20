import React from 'react';

import type { Page } from '@/payload.types';

import Intro from './Intro/Intro.component';
import Media from './Media/Media.component'; // todo:
import News from './News/News.component';

// keep alphabetical order, please
const blockComponents = {
    intro_block: Intro,
    latest_news_block: News,
    media_block: Media,
    news_block: News
};

type Props = {
    blocks: Page['sections'][0]['layout'][0][];
};

/**
 * todo: is this better than a switch statement?
 * afaik a switch statement is evaluated in its entirety,
 * whereas here we only evaluate the single entry in the object,
 * so this should tree shake properly
 */

export default function RenderBlocks({ blocks }: Props): React.ReactElement {
    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (!hasBlocks) {
        return <p>No blocks found</p>;
    }

    return (
        <>
            {blocks.map(({ blockType, ...restParams }) => {
                if (!blockType || !(blockType in blockComponents)) {
                    return <p key={restParams.id}>Block type not found: {blockType}</p>;
                }

                // @ts-expect-error - maybe one day
                return React.createElement(blockComponents[blockType], restParams);
            })}
        </>
    );
}
