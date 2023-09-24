import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import axios from 'axios';
import zustandStorage from '../../../utils/zustandStorage';

export type YoutubeCarousel = {
    thumbnailUrl: string;
    title: string;
    url: string;
};

export type State = {
    youtubeCarousel: YoutubeCarousel[];
    isLoading: boolean;

    toggleIsLoading: () => void;
    addYoutubeCarousel: (data: YoutubeCarousel) => void;
    updateYoutubeCarousel: (data: YoutubeCarousel[]) => void;
    fetchYoutubeCarousel: () => Promise<void>;
};

export const useYoutubeCarouselStore = create(
    persist<State>(
        set => ({
            youtubeCarousel: [],
            isLoading: true,

            toggleIsLoading: () => {
                set(state => ({isLoading: !state.isLoading}));
            },
            addYoutubeCarousel: (data: YoutubeCarousel) => {
                set(state => ({
                    youtubeCarousel: [...state.youtubeCarousel, data],
                }));
            },
            updateYoutubeCarousel: (data: YoutubeCarousel[]) => {
                set({youtubeCarousel: data});
            },
            fetchYoutubeCarousel: async () => {
                try {
                    const response = await axios.get(
                        'api/to/fetch/YoutubeCarousel',
                    );
                    set({youtubeCarousel: response.data});
                } catch (error) {
                    console.error('Failed fetching YoutubeCarousel: ', error);
                }
            },
        }),
        {
            name: 'youtubeCarouselStorage', // unique name
            storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);
