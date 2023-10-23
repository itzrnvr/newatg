import {
    useYoutubeCarouselStore,
    YoutubeCarouselItem,
} from '../store/YoutubeCarouselStore';
const useHomeViewModel = () => {
    //const homeController = useHomeController();
    const {
        youtubeCarousel,
        isLoading,
        isError,
        toggleIsLoading,
        fetchYoutubeCarousel,
    } = useYoutubeCarouselStore();

    return {
        youtubeCarousel,
        isLoading,
        isError,
        fetchYoutubeCarousel,
    };
};

export default useHomeViewModel;
