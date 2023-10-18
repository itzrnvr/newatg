import {ScreenContainer} from '../../layouts/ScreenContainer';
import {Button, StatusBar, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useHomeViewModel from '../../features/home/view-model/useHomeViewModel';
import YoutubeCarousel from '../../features/home/components/CarouselYoutube';
// import HomeComponentList from '../../features/home/components/ListHome';
import Toast from 'react-native-toast-message';
import {ListHome, ListHomeItem} from '../../features/home/components/ListHome';

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

    const showToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Something went wrong! :(',
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
            showToast();
        }
    }, [viewModel.youtubeCarousel, viewModel.isError]);

    return (
        <ScreenContainer
            loading={viewModel.isLoading}
            statusBarBackgroundColor={'#ffffff'}>
            <View className="h-full bg-white">
                <ListHome componentsToRender={listHomeItems} />
            </View>
        </ScreenContainer>
    );
};
