import type { Locale } from '@/static';

import Footer from '@/globals/Footer/Footer.component';
import Header from '@/globals/Header/Header.component';
import '@/styles/main.scss';
import { DEFAULT_LOCALE } from '@/static';

export const metadata = {
    title: 'Huncwot Next + Payload CMS Template',
    description: 'Next + Payload CMS template by Huncwot'
};

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactElement;
    params: Promise<{ locale?: Locale['code'] }>;
}) {
    const locale = (await params).locale || DEFAULT_LOCALE.code;

    return (
        <>
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
        </>
    );
}
