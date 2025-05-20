import configPromise from '@payload-config';
import { Flex, Heading, Separator } from '@radix-ui/themes';
import { getPayload } from 'payload';

import type { Locale } from '@/static';

import RichText from '@/components/RichText/RichText';

import styles from './Footer.module.scss';

export default async function Footer({ locale }: { locale: Locale['code'] }) {
    const payload = await getPayload({ config: configPromise });

    const { title, disclaimer } = await payload.findGlobal({
        slug: 'footer',
        locale: locale
    });

    return (
        <footer className={styles.footer}>
            <Separator size='4' />
            <Flex direction='row' align='center' justify='between' gap='4'>
                <Heading as='h1' size='9'>
                    {title}
                </Heading>
                {disclaimer && <RichText data={disclaimer} />}
            </Flex>
        </footer>
    );
}
