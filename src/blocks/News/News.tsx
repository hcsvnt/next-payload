import { Heading } from '@radix-ui/themes';

import type { News, NewsBlock } from '@/payload.types';

import { isIdNotContent } from '@/components/NotContent';
import RichText from '@/components/RichText/RichText';

import styles from './News.module.scss';

export default async function News({ title, news }: NewsBlock) {
    return (
        <div className={styles.container}>
            <p>{title}</p>
            <ul>
                {news
                    .filter((newsItem): newsItem is News => !isIdNotContent(newsItem))
                    .map(props => (
                        <NewsItem key={props.id} {...props} />
                    ))}
            </ul>
        </div>
    );
}

function NewsItem({ title, content }: News) {
    return (
        <li>
            <Heading as='h2'>{title}</Heading>
            {content && <RichText data={content} />}
        </li>
    );
}
