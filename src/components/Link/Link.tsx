import NextLink from 'next/link';

import type { Page } from '@/payload.types';

type Props = {
    label: string;
    className?: string;
    newTab?: boolean | null;
    page?: Page | string | null; // this can be a string when depth is not enough or access is limited
    url?: string | null;
};

export default function Link({ label, className, newTab, page, url }: Props) {
    const isInternal = page instanceof Object && 'slug' in page;
    const href = isInternal ? `/${page.slug}` : url;
    const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};

    if (!href) {
        return <p>href missing</p>;
    }

    return (
        <NextLink className={className} href={href} {...newTabProps}>
            <span>{label}</span>
        </NextLink>
    );
}
