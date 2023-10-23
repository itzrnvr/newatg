import {create} from 'zustand';
import {isNetworkAvailable} from 'utils/networkState';
import {fetchKeyStatus} from '../services/activateKeysApiService';
import {getMacID} from '../../../services/SessionManagerService';

type Store = {
    success: boolean;
    loading: boolean;
    error: Error | null; // Replace 'any' with expected error type if known
    serialKey: string;
    setSerialKey: (key: string) => void;
    submitKey: () => void;
};

export const useActivateKeyStore = create<Store>((set, get) => ({
    success: false,
    loading: false,
    error: null,
    serialKey: '',
    setSerialKey: (key: string) => set({serialKey: key}),
    submitKey: () => {
        set({error: null, success: false});

        if (get().serialKey.trim().length === 0) {
            set({error: Error('Serial key cannot be empty')});
            return;
        }

        set({loading: true}); // Start loading
        isNetworkAvailable
            .yes(async () => {
                console.log('fetchKeyStatus', 'CONNECTED');
                console.log('mac_id', await getMacID());
                fetchKeyStatus(get().serialKey, await getMacID())
                    .success(() => {
                        console.log('fetch key success');
                        set({
                            loading: false,
                            success: true,
                        }); // Stop loading when data is fetched
                    })
                    .error(error => {
                        set({
                            loading: false,
                            error: Error(
                                'Failed fetching Key Status! Likely invalid key.',
                            ),
                        });
                        console.log('Failed fetching Key Status: ', error);
                    });
            })
            .no(() => {
                set({
                    loading: false,
                    error: Error('Please check your network'),
                });
            });
    },
}));
