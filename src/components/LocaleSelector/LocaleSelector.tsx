'use client';
import { Button, DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import useCookie from '@/hooks/useCookie';
import { LOCALES } from '@/static';

// import styles from './LocaleSelector.module.scss';

export default function LocaleSelector({ locale }: { locale: string }) {
    const { updateCookie } = useCookie('locale', locale);
    const currentLocaleLabel = LOCALES.find(({ code }) => code.toLowerCase() === locale)?.label;
    const pathname = usePathname();
    const router = useRouter();

    /**
     *  oh, wow, never thought of this, but if the path starts with our delimieter,
     *  we'll get an empty string as the first element, so we can just ignore it
     */
    const [_, __, ...restPath] = pathname.split('/');

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button>{currentLocaleLabel}</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {LOCALES.map(({ code, label }) => (
                    <Link
                        key={code}
                        href={`/${code.toLowerCase()}/${restPath.join('')}`}
                        onClick={() => updateCookie(code)}
                    >
                        <DropdownMenu.Item>{label}</DropdownMenu.Item>
                    </Link>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
