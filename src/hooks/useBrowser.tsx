import { useIsClient } from '@uidotdev/usehooks';
import { flow, pipe } from 'effect';
import { gsap } from 'gsap';

import useLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useBrowserStoreActions } from '@/store/useBrowserStore';

import useEventListener from './useEventListener';

export type BreakpointName = 'desktop' | 'tablet' | 'phone';

const BREAKPOINTS = Object.freeze({
    desktop: '(min-width: 1024px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    phone: '(max-width: 767px)'
});

type BreakpointConfig = Record<BreakpointName, string>;

export default function useBrowser() {
    const { setBreakpoints, setIsTouch } = useBrowserStoreActions();
    const isClient = useIsClient();

    useLayoutEffect(() => {
        if (!isClient) return;

        const onResize = () => {
            flow(detectTouchDevice, setIsTouch);
            pipe(BREAKPOINTS, detectBreakpoints, setBreakpoints);
        };

        // Initial detection
        onResize();
        useEventListener('resize', onResize);
    }, [isClient, setBreakpoints, setIsTouch]);
}

function detectBreakpoints(config: BreakpointConfig): Record<BreakpointName, boolean> {
    const matchMedia = gsap.matchMedia();

    const breakpoints = Object.entries(config).reduce(
        (accumulator, [name, media]) => {
            matchMedia.add(media, () => {
                accumulator[name as BreakpointName] = true;
            });

            return accumulator;
        },
        {
            desktop: false,
            tablet: false,
            phone: false
        }
    );

    return breakpoints;
}

function detectTouchDevice() {
    if (typeof window === 'undefined') return false;

    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
