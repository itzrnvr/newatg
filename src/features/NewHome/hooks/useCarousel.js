import {useEffect} from 'react';
import {useCarouselStore} from '../store/carouselStore';
import {useCheckNetworkAndFetchData} from '../../../hooks/useCheckNetworkAndFetchData';
import {fetchCarouselItems} from '../services/fetchCarouselService';

export default function useCarousel() {
    const {carouselItems, setCarouselItems} = useCarouselStore();

    const {data, isLoading, error, refetch} =
        useCheckNetworkAndFetchData(fetchCarouselItems);

    useEffect(() => {
        if (data) {
            console.log('fromUseCaraouselHOok', data.result);
            setCarouselItems(data.result);
        }
        if (error) {
            console.log('Failed to fetch carousel items:', error);
        }
    }, [data, error, setCarouselItems]);

    return {
        carouselItems,
        reload: refetch, // Handle reload if necessary
        isLoading, // These were added to return the loading and error states
        error,
    };
}
