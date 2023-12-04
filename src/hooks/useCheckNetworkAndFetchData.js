import {useState, useEffect} from 'react';
import {isNetworkAvailable} from 'utils/networkState';
import {useAppStore} from '../store/appStore';

export const useCheckNetworkAndFetchData = fn => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {error, setError, reset} = useAppStore(); // Assuming useAppStore provides `setError` and `resetError` hooks

    const fetchData = async () => {
        setIsLoading(true);
        reset();

        try {
            const result = await fn();
            setData(result);
        } catch (e) {
            setError(e.message || 'An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    };

    // Check network and fetch data
    const checkNetworkAndFetch = () => {
        isNetworkAvailable
            .yes(() => {
                fetchData();
            })
            .no(() => {
                setError('Please check your internet connection!');
            });
    };

    useEffect(() => {
        // Function to handle data fetching

        checkNetworkAndFetch();
    }, [fn, setError, reset]);

    const refetch = () => {
        checkNetworkAndFetch();
    };

    return {data, isLoading, error, refetch};
};
