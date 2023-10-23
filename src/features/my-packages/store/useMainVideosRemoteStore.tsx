import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import zustandStorage from '../../../utils/zustandStorage';
import {isNetworkAvailable} from 'utils/networkState';
import {fetchMainVideos, Package} from '../services/myPackagesApiService';
import {getMacID} from '../../../services/SessionManagerService';

export type State = {
    packages: Package[];
    loading: boolean;
    error: Error | null;
    resetError: () => void;
    fetchMainVideos: () => void;
};

export const useMainVideosRemoteStore = create(
    persist<State>(
        set => ({
            packages: [],
            loading: true,
            error: null,

            fetchMainVideos: () => {
                set({error: null, loading: true});
                isNetworkAvailable
                    .yes(async () => {
                        console.log('fetch main vieos', 'CONNECTED');
                        fetchMainVideos('sgsgsgsgg')
                            .success(response => {
                                console.log(response);
                                set({
                                    packages: response?.video_list,
                                    loading: false,
                                }); // Stop loading when data is fetched
                            })
                            .error(error => {
                                set({loading: false});
                                set({
                                    error: Error('Failed fetching Main Videos'),
                                });
                                console.log(
                                    'Failed fetching Main Videos: ',
                                    error,
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
        }),
        {
            name: 'mainVideosRemoteStore', // unique name
            storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);
