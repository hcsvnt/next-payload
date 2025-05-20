import type { IntroBlock } from '@/payload.types';

import Link from '@/components/Link/Link';
import RichText from '@/components/RichText/RichText';

import styles from './Intro.module.scss';

export default function Intro(props: IntroBlock): React.ReactElement {
    const { title, content, id, test_link } = props;
    const contentLocalized = props['content_localized'];

    return (
        <article className={styles.container}>
            <h1>{title}</h1>
            {test_link && <Link {...test_link} />}
            {content && <RichText key={`intro-${id}-rt-1`} data={content} />}
            {contentLocalized && <RichText key={`intro-${id}-rt-2`} data={contentLocalized} />}
        </article>
    );
}
