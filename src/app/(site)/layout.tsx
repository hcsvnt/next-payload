import fonts from '@/utils/fonts';

import Providers from './providers';

import '@/styles/main.scss';

export const metadata = {
    title: 'Next + Payload by hallala.work',
    description: 'Next + Payload CMS template by hallala.work'
};

export default async function RootLayout({ children }: { children: React.ReactElement }) {
    return (
        <html lang='en-US' className={`${fonts.Allianz.variable} ${fonts.Nein.variable}`}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
