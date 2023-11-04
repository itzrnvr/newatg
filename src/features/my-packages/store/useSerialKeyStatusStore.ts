import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import zustandStorage from '../../../utils/zustandStorage';
import {isNetworkAvailable} from 'utils/networkState';
import {
    fetchSerialKeyStatusList,
    Serial,
} from '../services/seriaKeyListStatusApiService';

export type KeyClickType = {
    type: string | null;
    key: Serial | null;
};

export type State = {
    keys: Serial[];
    keyClickType: KeyClickType | null;
    onItemClick: (keyClickType: KeyClickType) => void;
    resetError: () => void;
    loading: boolean;
    error: Error | null;
    resetKeyClickType: () => void;
    fetchKeyStatusList: () => void;
};

export const useSerialKeyStatusStore = create(
    persist<State>(
        set => ({
            keys: [],
            loading: true,
            error: null,
            keyClickType: {type: null, key: null},
            onItemClick: (keyClickType: KeyClickType) =>
                set({keyClickType: keyClickType}),
            fetchKeyStatusList: () => {
                set({error: null, loading: true});
                isNetworkAvailable
                    .yes(async () => {
                        console.log('fetch key status list', 'CONNECTED');
                        fetchSerialKeyStatusList(
                            '4129E2A0-D92E-48EE-B493-83D65DEA5436',
                        )
                            .success(response => {
                                console.log(response);
                                set({
                                    keys: response?.serial_list,
                                    loading: false,
                                }); // Stop loading when data is fetched
                            })
                            .error(error => {
                                set({loading: false});
                                set({
                                    error: Error('Failed fetching Key Status'),
                                });
                                console.log(
                                    'Failed fetching Keys Status: ',
                                    error.message,
                                );
                            });
                    })
                    .no(() => {
                        set({loading: false});
                        set({error: Error('Please check your network')});
                    });
            },
            resetError: () => {
                set({error: null});
            },
            resetKeyClickType: () => {
                set({keyClickType: null});
            },
        }),
        {
            name: 'serialKeyStatusStore', // unique name
            storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);
