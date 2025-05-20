'use client';

// import { wait } from '@/utils/wait';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import React from 'react';

import '@/styles/main.scss';
import { easings } from '@/animations';

/**
 * In order to achieve a page exit transition we need to move the
 * AnimatePresence, but also the motion element into layout as it otherwise will
 * not work (the standard is to deal with all this inside the template file
 * which is the next layer within a layout, but it does not persist across route
 * changes).
 * It does not have any impact on the main content as it is passed as children
 * meaning they can still be server only components.
 *
 * To prevent rerendering on some paths, use just a part of the path e.g. for
 * /blog/posts/1 use /blog/posts.
 */

export default function RouteTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence initial={false}>
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.6,
                    ease: easings['ease-in-out']
                }}
                onAnimationStart={() => {
                    // here we can handle a curtain for example
                    // wait(400).then(() => {
                    //     document.body.classList.remove('is-navigating');
                    //     document.body.classList.add('is-navigated');
                    // });
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
