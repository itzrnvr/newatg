import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import zustandStorage from '../../../utils/zustandStorage';
import {fetchYoutubeSlidesFromNetwork} from '../services/homeApiService';
import {isNetworkAvailable} from 'utils/networkState';

export interface YoutubeCarouselItem {
    pkey: string;
    video_title: string;
    video_ytube_link: string;
    thumbnail: string;
    status: string;
    deleted: string;
    created: null | string;
    updated: null | string;
}

export type State = {
    youtubeCarousel: YoutubeCarouselItem[];
    isLoading: boolean;
    isError: Error | null;

    fetchYoutubeCarousel: () => Promise<void>;
};

export const useYoutubeCarouselStore = create(
    persist<State>(
        set => ({
            youtubeCarousel: [],
            isLoading: true,
            isError: null,

            fetchYoutubeCarousel: async () => {
                set({isError: null, isLoading: true});
                isNetworkAvailable
                    .yes(() => {
                        console.log('fetchYoutubeCarouselItems', 'CONNECTED');
                        fetchYoutubeSlidesFromNetwork()
                            .success(response => {
                                console.log(response);
                                set({
                                    youtubeCarousel: response,
                                    isLoading: false,
                                }); // Stop loading when data is fetched
                            })
                            .error(error => {
                                set({isLoading: false});
                                set({isError: Error(error.message)});
                                console.log(
                                    'Failed fetching YoutubeCarousel: ',
                                    error,
                                );
                            });
                    })
                    .no(() => {
                        set({isLoading: false});
                        set({isError: Error('Please check your network')});
                    });
            },
        }),
        {
            name: 'youtubeCarouselStorage', // unique name
            storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);
