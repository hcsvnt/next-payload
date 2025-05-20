import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import React, { cache } from 'react';

import type { Locale } from '@/static';

import RenderBlocks from '@/blocks/RenderBlocks';
import RefreshRouteOnSave from '@/components/RefreshRouteOnSave';
import { DEFAULT_LOCALE } from '@/static';
import { getVercelURL } from '@/utils/getURL';

type Args = {
    params: Promise<{
        slug?: string;
        locale?: Locale['code'];
    }>;
    searchParams: Promise<{
        draft?: string;
    }>;
};

export default async function Page({
    params: paramsPromise,
    searchParams: searchParamsPromise
}: Args) {
    const { slug = 'test', locale = DEFAULT_LOCALE.code } = await paramsPromise;
    const { draft: draftSecret } = await searchParamsPromise;
    const page = await queryPageBySlug({ slug, locale, draftSecret });

    // console.log('page', page, locale);
    if (!page) {
        notFound();
    }

    return page.sections.map(({ id, layout }) => (
        <section>
            <RenderBlocks key={id} blocks={layout} />
            <RefreshRouteOnSave
                serverURL={getVercelURL() ? `https://${getVercelURL()}` : 'http://localhost:3000'}
            />
        </section>
    ));
}

const queryPageBySlug = cache(
    async ({
        slug,
        locale,
        draftSecret
    }: {
        slug: string;
        locale: Locale['code'];
        draftSecret?: string;
    }) => {
        const payload = await getPayload({ config: configPromise });
        const canViewDrafts = draftSecret === process.env.DRAFT_SECRET;
        const result = await payload.find({
            collection: 'pages',
            limit: 1,
            pagination: false,
            locale: locale,
            draft: canViewDrafts,
            where: {
                slug: {
                    equals: slug
                }
            }
        });

        /**
         * !IMPORTANT!
         *
         * If the page is in 'draft' status and draft secret isn't provided or correct return null.
         *
         * This check is necessary because Payload doesn't restrict access to
         * 'draft' pages in any way.
         *
         * The possible statuses are:
         * - published - the page is published and anyone can see the current version
         * - changed - the page was published but has unpublished changes, only
         *   users bearing the correct draft secret can see these changes, but
         *   anyone can see the latest published version
         * - draft - the page was never published or was unpublished (there's a
         *   button for it in the admin panel)
         *
         * The 'draft' flag in payload.find() only changes whether we fetch the
         * latest published version (default) or the any latest version (including
         * 'draft' and 'changed').
         *
         * When 'unpublishing' a page, it's status changes from 'published' to
         * 'draft', but even with the 'draft' flag set to false, we can still
         * see the page, which seems to be incorrect behavior.
         *
         * When editing a 'published' page, the status changes to 'changed', but
         * it doesn't do so when editing a 'draft' page, which is also quite peculiar.
         *
         * So what this does is allowing 'draft' or 'changed' pages to be seen
         * with the correct draft secret, but also restricting access to 'draft' without it.
         *
         * And all this is IMHO incorrect implementation and naming of the
         * statuses and draft previews on Payload's side.
         */

        if (result.docs?.[0]?._status === 'draft' && !canViewDrafts) {
            return null;
        }

        return result.docs?.[0] || null;
    }
);
