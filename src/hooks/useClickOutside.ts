import type { RefObject } from 'react';

import useEventListener from './useEventListener';

const useClickOutside = (containerRef: RefObject<HTMLElement>, callback: () => void) => {
    useEventListener('click', (event: MouseEvent) => {
        const { target } = event;

        // Do nothing if there is no target or it's not an instance of Node
        if (!target || !(target instanceof Node)) {
            return;
        }

        // If the target is not inside the container, call it
        if (containerRef.current && !containerRef.current.contains(target)) {
            callback();
        }
    });
};

export default useClickOutside;
