import { useCallback, useMemo } from 'react';

import { debounce } from '@/utils/debounce';

import useEventListener from './useEventListener';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useDebouncedResize = (callback: () => void, time = 100, fireOnInit?: boolean) => {
    const handleResize = useCallback(() => callback(), []);
    const debouncedHandleResize = useMemo(() => debounce(handleResize, time), [handleResize, time]);

    useEventListener('resize', debouncedHandleResize);
    useIsomorphicLayoutEffect(() => {
        if (fireOnInit) {
            callback();
        }
    }, [callback, fireOnInit]);
};

export default useDebouncedResize;
