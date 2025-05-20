'use client';

import { useRowLabel } from '@payloadcms/ui';

/**
 * Generic Payload CMS Field Label component for any Block Links array field.
 * It displays the value of the specified field instead of the default "Row 1", "Row 2", etc.
 * @param field The field to display in the label
 * @returns The field label component
 * @example
 * ```tsx
 * <RowLabel<NonNullable<MapBannerBlock['links']>[number]> field='title' />
 * ```
 */
export default function RowLabel<T extends object>({ field }: { field: keyof T }) {
    const { data, rowNumber } = useRowLabel<NonNullable<T>>();

    const label = field in data ? data[field] : `Field "${String(field)}" missing in ${rowNumber}?`;
    return <span>{String(label)}</span>;
}

// import type { MapBannerBlock } from '@/payload.types';

// import RowLabel from '@/components/Admin/RowLabel';

// export default () => <RowLabel<MapBannerBlock['links'][number]> field='title' />;
