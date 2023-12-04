import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export const useCarouselStore = create(
    immer(set => ({
        carouselItems: [],
        isLoading: false,

        setCarouselItems: items =>
            set(state => {
                console.log('fromStore', items);
                state.carouselItems = items;
            }),

        setIsLoading: loading =>
            set(state => {
                state.isLoading = loading;
            }),

        reset: () =>
            set(state => {
                state.carouselItems = [];
                state.isLoading = false;
            }),
    })),
);
