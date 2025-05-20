import type { NextRequest } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import { pipe } from 'effect';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';

import { DEFAULT_LOCALE, LOCALES } from '@/static';

export function middleware(request: NextRequest) {
    // return NextResponse.next(); // bypass middleware
    return localeMiddleware(request); // use locale middleware
}

function getLocale(request: NextRequest): string {
    let locale = '';

    try {
        locale = match(
            new Negotiator({
                headers: { 'accept-language': request.headers.get('accept-language') ?? undefined }
            }).languages(),
            LOCALES.map(({ code }) => code),
            DEFAULT_LOCALE.code
        );
    } catch (e) {
        console.error(e);
        locale = DEFAULT_LOCALE.code;
    }

    return locale;
}

function localeMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isRootPath = pathname === '/';
    const isDocsPath = pathname.startsWith('/docs');
    const isPayloadPath = ['/admin', '/api'].some(path => pathname.includes(path));
    const pathnameHasLocale = LOCALES.map(({ code }) => code).some(locale =>
        pathname.startsWith(`/${locale.toLowerCase()}`)
    );

    // Skip locale middleware for root, docs, and payload paths
    if ([isRootPath, pathnameHasLocale, isDocsPath, isPayloadPath].some(Boolean)) {
        return NextResponse.next();
    }

    const cookieLocale = request.cookies.get('locale')?.value;
    // If browser has a locale cookie, redirect to that locale
    if (cookieLocale) {
        const locale = match(
            [cookieLocale],
            LOCALES.map(({ code }) => code),
            DEFAULT_LOCALE.code
        );
        return redirectToLocale(request, locale);
    }

    // If the pathname doesn't have a locale, redirect to one that matches the
    // user's accept-language header or the default locale
    return pipe(request, getLocale, locale => redirectToLocale(request, locale));
}

const redirectToLocale = (request: NextRequest, locale: string) => {
    request.nextUrl.pathname = `/${locale.toLowerCase()}${request.nextUrl.pathname}`;
    return NextResponse.redirect(request.nextUrl);
};

export const config = {
    matcher: [
        '/((?!_next).*)' // Skip all internal paths (_next)
        // '/', // Match the root
        // `/(${LOCALES.map(({ code }) => code.toLowerCase()).join('|')})/:path*` // Match only internationalized pathnames
    ]
};
