'use client';
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendGTMEvent } from '@next/third-parties/google';

const isDev = process.env.NODE_ENV === 'development' || false;

/*
 * Hook to initialize Google Tag Manager
 * note: window interface extended in globals.d.ts
 */

interface EventProps {
    event: string;
    [key: string]: any;
}

export function trackedOnClick(onClick: () => void, event: EventProps) {
    onClick();
    trackEvent(event);
}

export function trackEvent({ event, ...rest }: EventProps) {
    if (window?.dataLayer === undefined) {
        console.warn('GTM not initialized', { event, ...rest });
        return;
    }

    isDev && console.log({ event, ...rest });
    sendGTMEvent({ event, ...rest });
}

export function trackPageView(path: string, title?: string) {
    if (window?.dataLayer === undefined) {
        console.warn('GTM not initialized', { event, path, title });
        return;
    }

    // isDev && console.log({ event: 'page_view', page_path: path, page_title: title });
    sendGTMEvent({ event: 'page_view', page_path: path, page_title: title });
}
