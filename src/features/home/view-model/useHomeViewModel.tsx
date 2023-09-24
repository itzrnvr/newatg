//import useHomeController from '../view-controller/useHomeController';
import {
    useYoutubeCarouselStore,
    YoutubeCarousel,
} from '../store/YoutubeCarouselStore';
const useHomeViewModel = () => {
    //const homeController = useHomeController();
    const {youtubeCarousel, isLoading, toggleIsLoading, addYoutubeCarousel} =
        useYoutubeCarouselStore();
    const setLoadingFalse = () => {
        toggleIsLoading();
    };

    const addDataToCarousel = () => {
        const data: YoutubeCarousel = {
            thumbnailUrl: 'gg',
            title: 'lmao',
            url: 'gg',
        };

        addYoutubeCarousel(data);
    };

    return {
        youtubeCarousel,
        isLoading,
        setLoadingFalse,
        addDataToCarousel,
    };
};

export default useHomeViewModel;
