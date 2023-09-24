import {ScreenContainer} from '../../layouts/ScreenContainer';
import {Button, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {StyledComponent} from 'nativewind';
import useHomeViewModel from '../../features/home/view-model/useHomeViewModel';
import {isArrayEmpty} from 'utils/arrayUtils';
import YoutubeCarousel from '../../features/home/components/YoutubeCarousel';
import HomeComponentList from '../../features/home/components/HomeComponentList';

export const Home = () => {
    const viewModel = useHomeViewModel();
    useEffect(() => {
        isArrayEmpty(viewModel.youtubeCarousel).yes(() => {
            viewModel.addDataToCarousel();
        });
        setTimeout(() => {
            viewModel.setLoadingFalse();
        }, 3000);
    }, []);

    return (
        <ScreenContainer loading={viewModel.isLoading}>
            <View className="p-3 bg-amber-400 h-full">
                {/*{viewModel.youtubeCarousel.map((youtubeCarousel, index) => (*/}
                {/*    <Text key={index} className={'text-slate-700'}>*/}
                {/*        {youtubeCarousel.title}*/}
                {/*    </Text>*/}
                {/*))}*/}
                {/*<HomeComponentList />*/}
                <YoutubeCarousel />
                <Button
                    title={'Click me'}
                    onPress={() => viewModel.addDataToCarousel()}
                />
            </View>
        </ScreenContainer>
    );
};
