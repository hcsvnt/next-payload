import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { BreakpointName } from '@/hooks/useBrowser';

export type Breakpoints = Record<BreakpointName, boolean> | undefined;

interface BrowserStore {
    breakpoints: Breakpoints;
    isTouch: boolean;
    splits: SplitText[];
    actions: {
        setBreakpoints: (breakpoint: Breakpoints) => void;
        setIsTouch: (isTouch: boolean) => void;
        setSplits: (splits: SplitText[]) => void;
        resetSplits: () => void;
    };
}

const useBrowserStore = create<BrowserStore>()(
    devtools(
        (set, get) => ({
            breakpoints: undefined,
            isTouch: false,
            splits: [],
            actions: {
                setBreakpoints: breakpoints => set(() => ({ breakpoints })),
                setIsTouch: isTouch => set(() => ({ isTouch })),
                setSplits: newSplits => {
                    const { splits } = get();

                    set(() => ({
                        splits: [...splits, ...newSplits]
                    }));
                },
                resetSplits: () => set({ splits: [] })
            }
        }),
        {
            name: 'Browser Store'
        }
    )
);

export const useBreakpoints = () => useBrowserStore(state => state.breakpoints);
export const useIsTouch = () => useBrowserStore(state => state.isTouch);
export const useSplits = () => useBrowserStore(state => state.splits);
export const useBrowserStoreActions = () => useBrowserStore(state => state.actions);
