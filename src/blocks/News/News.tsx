import { Heading } from '@radix-ui/themes';

import type { News, NewsBlock } from '@/payload.types';

import RichText from '@/components/RichText/RichText';

import styles from './News.module.scss';

export default async function News({ title, news }: NewsBlock) {
    if (!news?.length) return <p>No news to display</p>;

    return (
        <div className={styles.container}>
            <p>{title}</p>
            <ul>
                {/* todo: shouldn't be casted */}
                {(news as News[]).map(
                    ({ id, title, category, hero_image, content, published_at }) => {
                        return (
                            <li key={id}>
                                <Heading as='h2'>{title}</Heading>
                                {/* <Text>{category.title}</Text> */}
                                {content && <RichText data={content} />}
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
}
