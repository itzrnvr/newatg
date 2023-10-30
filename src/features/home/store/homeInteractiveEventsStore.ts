import {create} from 'zustand';

interface Store {
    scrolling: boolean;
    setScrolling: (status: boolean) => void;
}

export const useHomeInteractiveEventsStore = create<Store>((set, get) => ({
    scrolling: false,
    setScrolling: (status: boolean) => set({scrolling: status}),
}));
