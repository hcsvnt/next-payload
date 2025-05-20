'use client';
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation.js';
import React from 'react';

/**
 * A component that refreshes the route when payload document is saved.
 *
 * @param {string} serverURL - The URL of the server, this needs to come from an
 * upstream server component such as a page.tsx, because client components don't have access to
 * regular environment variables.
 * @returns {React.ReactElement} The component that refreshes the route when payload document is saved.
 */

export default function RefreshRouteOnSave({ serverURL }: { serverURL: string }) {
    const router = useRouter();

    if (!serverURL) {
        return null;
    }

    return <PayloadLivePreview refresh={() => router.refresh()} serverURL={serverURL} />;
}
