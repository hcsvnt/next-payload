import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

import { useBrowserStoreActions, useIsTouch } from '@/store/useBrowserStore';

import useEventListener from './useEventListener';

/**
 *  Refresh ScrollTrigger on resize
 *  Remove SplitTexts on page unmount
 */

export default function usePage() {
    const isTouch = useIsTouch();
    const { resetSplits } = useBrowserStoreActions();

    useEventListener('resize', () => isTouch && ScrollTrigger.refresh());

    useEffect(() => {
        return () => {
            resetSplits();
        };
    }, [isTouch, resetSplits]);
}
