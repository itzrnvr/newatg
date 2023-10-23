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
        resetError,
        fetchYoutubeCarousel,
    } = useYoutubeCarouselStore();

    return {
        youtubeCarousel,
        isLoading,
        isError,
        resetError,
        fetchYoutubeCarousel,
    };
};

export default useHomeViewModel;
