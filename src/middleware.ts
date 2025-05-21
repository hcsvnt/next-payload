import type { NextFetchEvent, NextRequest } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import { trace } from '@opentelemetry/api';
import { pipe } from 'effect';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';

import { DEFAULT_LOCALE, LOCALES } from '@/static';

export type ChainableMiddleware = (
    request: NextRequest,
    event: NextFetchEvent
) => Promise<NextResponse>;

export type MiddlewareFactory = (next: ChainableMiddleware) => ChainableMiddleware;

export function chainMiddleware(
    functions: MiddlewareFactory[] = [],
    index = 0
): ChainableMiddleware {
    const current = functions[index];
    if (current) {
        const next = chainMiddleware(functions, index + 1);
        return current(next);
    }

    return async request => NextResponse.next({ request });
}

// --- Middleware entry point ---
export function middleware(request: NextRequest, event: NextFetchEvent) {
    return chainMiddleware([localeMiddleware])(request, event);
}

export const config = {
    matcher: [
        '/((?!_next).*)' // Skip all internal paths (_next)
    ]
};

// --- Telemetry middleware ---
const _telemetryMiddleware: MiddlewareFactory = next => async (request, event) => {
    const response = await next(request, event);
    const current = trace.getActiveSpan();

    // set server-timing header with traceparent
    if (current) {
        response.headers.set(
            'server-timing',
            `traceparent;desc="00-${current.spanContext().traceId}-${current.spanContext().spanId}-01"`
        );
    }

    return response;
};

// --- Locale middleware ---
const localeMiddleware: MiddlewareFactory = next => async (request, event) => {
    const { pathname } = request.nextUrl;

    const _isRootPath = pathname === '/';
    const _isDocsPath = pathname.startsWith('/docs');
    const _isNotFoundPath = pathname.startsWith('/404');
    const isPayloadPath = ['/admin', '/api'].some(path => pathname.includes(path));
    const pathnameHasLocale = LOCALES.map(({ code }) => code).some(locale =>
        pathname.startsWith(`/${locale}`)
    );

    // Bypass middleware for selected paths
    if ([pathnameHasLocale, isPayloadPath].some(Boolean)) {
        return next(request, event);
    }

    const cookieLocale = request.cookies.get('locale')?.value;

    if (cookieLocale) {
        const locale = match(
            [cookieLocale],
            LOCALES.map(({ code }) => code),
            DEFAULT_LOCALE.code
        );
        return redirectToLocale(request, locale);
    }

    const locale = pipe(request, getLocale, locale => locale);
    return redirectToLocale(request, locale);
};

// --- Helper functions ---
function getLocale(request: NextRequest): string {
    try {
        return match(
            new Negotiator({
                headers: { 'accept-language': request.headers.get('accept-language') ?? undefined }
            }).languages(),
            LOCALES.map(({ code }) => code),
            DEFAULT_LOCALE.code
        );
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return DEFAULT_LOCALE.code;
    }
}

const redirectToLocale = (request: NextRequest, locale: string) => {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${request.nextUrl.pathname}`;
    return NextResponse.redirect(url);
};
