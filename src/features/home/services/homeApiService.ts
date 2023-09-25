import {YoutubeCarouselItem} from '../store/YoutubeCarouselStore';

const BASE_URL =
    'https://junglebookpune.org/test_awaken_genius/webserv/webserv_mobile_react';

interface APIResponse<T> {
    success: (callback: (items: T[]) => void) => APIResponse<T>;
    error: (callback: (error: any) => void) => APIResponse<T>;
}

export const fetchYoutubeSlidesFromNetwork =
    (): APIResponse<YoutubeCarouselItem> => {
        let successCallback: (items: YoutubeCarouselItem[]) => void = () => {};
        let errorCallback: (error: any) => void = () => {};

        const result: APIResponse<YoutubeCarouselItem> = {
            success: (
                callback: (items: YoutubeCarouselItem[]) => void,
            ): APIResponse<YoutubeCarouselItem> => {
                successCallback = callback;
                return result;
            },
            error: (
                callback: (error: any) => void,
            ): APIResponse<YoutubeCarouselItem> => {
                errorCallback = callback;
                return result;
            },
        };

        fetch(`${BASE_URL}/get_video_slider`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(jsonResponse => {
                successCallback(jsonResponse.result);
            })
            .catch((error: any) => {
                errorCallback(error);
            });

        return result;
    };
