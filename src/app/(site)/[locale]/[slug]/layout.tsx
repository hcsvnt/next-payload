import type { Locale } from '@/static';

import Footer from '@/globals/Footer/Footer';
import Header from '@/globals/Header/Header';
import '@/styles/main.scss';
import { DEFAULT_LOCALE } from '@/static';

export const metadata = {
    title: 'Next + Payload by hallala.work',
    description: 'Next + Payload CMS template by hallala.work'
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
