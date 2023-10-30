import {ScreenContainer} from '../../layouts/ScreenContainer';
import {Button, StatusBar, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useHomeViewModel from '../../features/home/view-model/useHomeViewModel';
import YoutubeCarousel from '../../features/home/components/CarouselYoutube';
// import HomeComponentList from '../../features/home/components/ListHome';
import Toast from 'react-native-toast-message';
import {ListHome, ListHomeItem} from '../../features/home/components/ListHome';
import {wait} from 'utils/misc';
import {makeSecureRequest} from '../../features/video-playback/services/networkEncryptionService';

// Define the list of components to render
const componentsToRender: ListHomeItem[] = [
    {type: 'header', id: 'comp-header'},
    {
        type: 'carousel',
        id: 'comp-carousel',
        data: [
            // Add rest of carousel items here
        ],
    },

    {
        type: 'midSectionImage',
        id: 'comp-midSectionImage',
    },
    {
        type: 'grid',
        id: 'comp-grid',
    },
];

export const Home = () => {
    const viewModel = useHomeViewModel();
    const [listHomeItems, setListHomeItems] = useState(componentsToRender);

    const successToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Error',
            text2: 'Something went wrong! :(',
        });
    };

    const errorToast = (
        title: string = 'Something went wrong',
        message: string = 'There seems to be a problem',
    ) => {
        Toast.show({
            type: 'error',
            text1: title,
            text2: message,
        });
    };

    useEffect(() => {
        viewModel.fetchYoutubeCarousel();
    }, []);

    useEffect(() => {
        componentsToRender[1].data = viewModel.youtubeCarousel;
        setListHomeItems(componentsToRender);

        if (viewModel.isError) {
            console.log(viewModel.isError?.message);
            errorToast('Something went wrong!', viewModel.isError?.message);
            viewModel.resetError();
        }
    }, [viewModel.youtubeCarousel, viewModel.isError]);

    return (
        <ScreenContainer
            loading={viewModel.isLoading}
            statusBarBackgroundColor={'#ffffff'}>
            <View className="h-full bg-white items-center justify-center">
                {viewModel.isError && (
                    <Text className={'text-black'}>
                        Pull down to refresh...
                    </Text>
                )}
                <ListHome
                    componentsToRender={listHomeItems}
                    onRefresh={() => viewModel.fetchYoutubeCarousel()}
                />
            </View>
        </ScreenContainer>
    );
};
