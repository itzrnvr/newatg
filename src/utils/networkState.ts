import NetInfo from '@react-native-community/netinfo';

class NetworkUtils {
    private isConnected: boolean | null = null;

    constructor() {
        (async () => {
            const response = await NetInfo.fetch();
            this.isConnected = response?.isConnected || null;
        })();
    }

    yes(callback: () => void): NetworkUtils {
        setTimeout(() => {
            // Used to allow network status fetch to complete
            if (this.isConnected) {
                callback();
            }
        }, 1000); // Delay might need to be adjusted based on your needs and network speed
        return this;
    }

    no(callback: () => void): NetworkUtils {
        setTimeout(() => {
            // Used to allow network status fetch to complete
            if (!this.isConnected) {
                callback();
            }
        }, 1000); // Delay might need to be adjusted based on your needs and network speed
        return this;
    }
}

export const isNetworkAvailable = new NetworkUtils(); // Returns instance of NetworkUtils directly
