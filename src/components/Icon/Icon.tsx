'use client';

import classNames from 'classnames';

import Close from '@/assets/svg/close.svg';

import styles from './Icon.module.scss';

export type IconProps = {
    name: keyof typeof icons;
    className?: string;
};

export const icons = {
    close: Close
} as const;

export default function Icon({ name, className }: IconProps) {
    const Icon = icons[name];

    return <Icon className={classNames(styles.icon, styles[name], className, `svg-${name}`)} />;
}
