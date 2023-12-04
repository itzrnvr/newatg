import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export const useAppStore = create(
    immer(set => ({
        error: null,

        setError: error =>
            set(state => {
                state.error = error;
            }),

        reset: () =>
            set(state => {
                state.error = null;
            }),
    })),
);
