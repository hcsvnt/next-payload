import fonts from '@/utils/fonts';

import Providers from './providers';

import '@/styles/main.scss';

export const metadata = {
    title: 'Huncwot Next + Payload CMS Template',
    description: 'Next + Payload CMS template by Huncwot'
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
