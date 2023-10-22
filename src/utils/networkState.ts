import NetInfo from '@react-native-community/netinfo';

class NetworkUtils {
    private isConnected: boolean = false;

    constructor() {
        this.init();
    }

    private async init() {
        const state = await NetInfo.fetch();
        this.isConnected = state.isConnected || false;
        // Subscribe to network state changes
        NetInfo.addEventListener(state => {
            this.isConnected = state.isConnected || false;
        });
    }

    public yes(callback: () => void): NetworkUtils {
        if (this.isConnected) {
            callback();
        }
        return this;
    }

    public no(callback: () => void): NetworkUtils {
        if (!this.isConnected) {
            callback();
        }
        return this;
    }
}

export default new NetworkUtils();

export const isNetworkAvailable = new NetworkUtils(); // Returns instance of NetworkUtils directly
