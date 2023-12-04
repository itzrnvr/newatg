import React from 'react';
import {View} from 'react-native';
import {ScreenContainer} from '../../layouts/ScreenContainer';
import useCarousel from '../../features/NewHome/hooks/useCarousel';
import HomeScreenList from '../../features/NewHome/components/HomeScreenList';
import Header from '../../features/NewHome/components/Header';
import Carousel from '../../features/NewHome/components/Carousel';

const Index = () => {
    const {carouselItems, loading, error, reload} = useCarousel();

    const sectionsData = [
        {type: 'Header', data: null, Component: Header},
        {type: 'Carousel', data: carouselItems, Component: Carousel},
    ];

    return (
        <ScreenContainer statusBarBackgroundColor="#ffffff">
            <HomeScreenList data={sectionsData} />
        </ScreenContainer>
    );
};

export default Index;
