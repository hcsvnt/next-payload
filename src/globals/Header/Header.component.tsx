import configPromise from '@payload-config';
import { Flex, Heading, Separator } from '@radix-ui/themes';
import { getPayload } from 'payload';

import type { Locale } from '@/static';

import LocaleSelector from '@/components/LocaleSelector/LocaleSelector';

import styles from './Header.module.scss';

export default async function Header({ locale }: { locale: Locale['code'] }) {
    const payload = await getPayload({ config: configPromise });

    const { title, show_locale_selector } = await payload.findGlobal({
        slug: 'header',
        locale: locale
    });

    return (
        <header className={styles.header}>
            <Flex direction='row' align='center' justify='between' gap='4'>
                <Heading as='h1' size='9'>
                    {title}
                </Heading>
                {show_locale_selector && <LocaleSelector locale={locale} />}
            </Flex>
            <Separator size='4' />
        </header>
    );
}
