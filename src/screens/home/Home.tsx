import {ScreenContainer} from '../../layouts/ScreenContainer';
import {Button, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useHomeViewModel from '../../features/home/view-model/useHomeViewModel';
import YoutubeCarousel from '../../features/home/components/CarouselYoutube';
// import HomeComponentList from '../../features/home/components/ListHome';
import Toast from 'react-native-toast-message';

export const Home = () => {
    const viewModel = useHomeViewModel();

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
        if (viewModel.isError) {
            console.log(viewModel.isError?.message);
            showToast();
        }
    }, [viewModel.isError]);

    return (
        <ScreenContainer loading={viewModel.isLoading}>
            <View className="p-3 bg-amber-400 h-full">
                {viewModel.youtubeCarousel.map((youtubeCarousel, index) => (
                    <Text key={index} className={'text-slate-950'}>
                        {youtubeCarousel.video_title}
                    </Text>
                ))}
                {/*<HomeComponentList />*/}
                <YoutubeCarousel />

                <View className={''}>
                    <Button
                        title={'Click me'}
                        onPress={() => viewModel.fetchYoutubeCarousel()}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
};
