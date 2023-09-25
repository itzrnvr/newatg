import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
    const [isConnected, setConnected] = useState<boolean | null>(null);

    useEffect(() => {
        // Fetch initial network status
        NetInfo.fetch().then(state => {
            setConnected(state.isConnected);
        });

        // Subscribe to network status changes
        const unsubscribe = NetInfo.addEventListener(state => {
            setConnected(state.isConnected);
        });

        // Unsubscribe to the event on unmount
        return () => unsubscribe();
    }, []);

    return isConnected;
};
