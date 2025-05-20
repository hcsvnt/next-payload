import type { Locale } from '@/static';

import Footer from '@/globals/Footer/Footer.component';
import Header from '@/globals/Header/Header.component';
import '@/styles/main.scss';
import { DEFAULT_LOCALE } from '@/static';
import { getVercelURL } from '@/utils/getURL';

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

            <ul style={{ padding: 'var(--padding);' }}>
                <li>Dynamic URL: {getVercelURL() || 'http://localhost:3000'}</li>
                <li>SERVER_URL: {process.env.SERVER_URL}</li>
                <li>NEXT_PUBLIC_SERVER_URL: {process.env.NEXT_PUBLIC_SERVER_URL}</li>
                <li>VERCEL_ENV: {process.env.VERCEL_ENV}</li>
                <li>VERCEL_URL: {process.env.VERCEL_URL},</li>
                <li>VERCEL_BRANCH_URL: {process.env.VERCEL_BRANCH_URL},</li>
                <li>VERCEL_PROJECT_PRODUCTION_URL: {process.env.VERCEL_PROJECT_PRODUCTION_URL},</li>
            </ul>

            <Footer locale={locale} />
        </>
    );
}
