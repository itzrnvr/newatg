//import useHomeController from '../view-controller/useHomeController';
import {
    useYoutubeCarouselStore,
    YoutubeCarouselItem,
} from '../store/YoutubeCarouselStore';
import {isNetworkAvailable} from 'utils/networkState';
import {useNetworkStatus} from '../../../services/NetworkStatusService';
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
