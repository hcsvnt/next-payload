import localFont from 'next/font/local';

const Allianz = localFont({
    src: [
        {
            path: '../assets/fonts/ESAllianz/ESAllianz300.woff2',
            weight: '300',
            style: 'normal'
        },
        {
            path: '../assets/fonts/ESAllianz/ESAllianz500.woff2',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../assets/fonts/ESAllianz/ESAllianz700.woff2',
            weight: '700',
            style: 'normal'
        },
        {
            path: '../assets/fonts/ESAllianz/ESAllianz800.woff2',
            weight: '800',
            style: 'normal'
        }
    ],
    variable: '--font-primary',
    fallback: ['Helvetica', 'ui-sans-serif']
});

const Nein = localFont({
    src: [
        {
            path: '../assets/fonts/ESNein/ESNein800.woff2',
            weight: '800',
            style: 'normal'
        }
    ],
    variable: '--font-secondary',
    fallback: ['Helvetica', 'ui-sans-serif']
});

const fonts = { Allianz, Nein };
export default fonts;
