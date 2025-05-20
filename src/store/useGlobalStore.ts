import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GlobalStore {
    isMenuOpen: boolean;
    actions: {
        setIsMenuOpen: (isOpen: boolean) => void;
        toggleMenu: () => void;
    };
}

const useGlobalStore = create<GlobalStore>()(
    devtools(
        set => ({
            isMenuOpen: false,
            actions: {
                setIsMenuOpen: isOpen => set(() => ({ isMenuOpen: isOpen })),
                toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen }))
            }
        }),
        { name: 'Global Store' }
    )
);

export const useIsMenuOpen = () => useGlobalStore(state => state.isMenuOpen);
export const useGlobalStoreActions = () => useGlobalStore(state => state.actions);
