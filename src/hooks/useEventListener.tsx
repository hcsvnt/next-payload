import type { RefObject } from 'react';

import { useEffect } from 'react';

function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: undefined,
    options?: boolean | AddEventListenerOptions
): void;

function useEventListener<
    K extends keyof HTMLElementEventMap,
    T extends HTMLElement = HTMLDivElement
>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: RefObject<T>,
    options?: boolean | AddEventListenerOptions
): void;

function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap,
    T extends HTMLElement | void = void
>(
    eventName: KW | KH,
    handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
    element?: RefObject<T>,
    options?: boolean | AddEventListenerOptions
) {
    useEffect(() => {
        const targetElement: T | Window = element?.current ?? window;

        if (!targetElement?.addEventListener) {
            return;
        }

        const listener: typeof handler = event => handler(event);
        targetElement.addEventListener(eventName, listener, options);

        return () => {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}

export default useEventListener;
