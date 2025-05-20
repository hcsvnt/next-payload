'use client';
import { useCallback } from 'react';

import { useBrowserStoreActions, useIsTouch, useSplits } from '@/store/useBrowserStore';

import useEventListener from './useEventListener';

export default function useRevertSplitText() {
    const isTouch = useIsTouch();
    const splits = useSplits();

    const { resetSplits } = useBrowserStoreActions();

    const onResize = useCallback(() => {
        if (isTouch) return;

        splits.forEach(split => split.revert());
        resetSplits();
    }, [resetSplits, isTouch, splits]);

    const onOrientationChange = useCallback(() => {
        splits.forEach(split => split.revert());
        resetSplits();
    }, [resetSplits, splits]);

    useEventListener('resize', onResize);
    useEventListener('orientationchange', onOrientationChange);
}
