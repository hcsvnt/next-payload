/* eslint-disable  @typescript-eslint/no-explicit-any */
export function debounce<F extends (...args: any[]) => any>(callback: F, timeout = 300) {
    let timer = 0;

    return (...args: Parameters<F>) => {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            callback(...args);
        }, timeout);
    };
}
