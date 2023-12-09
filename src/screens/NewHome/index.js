import React from 'react';
import {View} from 'react-native';
import {ScreenContainer} from '../../layouts/ScreenContainer';
import useCarousel from '../../features/NewHome/hooks/useCarousel';
import HomeScreenList from '../../features/NewHome/components/HomeScreenList';
import Header from '../../features/NewHome/components/Header';
import CarouselYoutube from '../../features/NewHome/components/CarouselYoutube';
import Packages from '../../features/NewHome/components/Packages';
import CarouselPackages from '../../features/NewHome/components/CarouselPackages';
import {defBannerPackages} from '../../features/NewHome/utils/CarouselPackagesConstants';
import ListHorizontalPackages from '../../features/NewHome/components/ListHorizontalPackages';

const Index = () => {
    const {carouselItems, loading, error, reload} = useCarousel();

    const sectionsData = [
        {type: 'Header', data: null, Component: Header},
        {type: 'Carousel', data: carouselItems, Component: CarouselYoutube},
        {
            type: 'CarouselPackages',
            data: defBannerPackages,
            Component: CarouselPackages,
        },
        {type: 'Packages', data: null, Component: Packages},
        {
            type: 'PackagesList',
            data: carouselItems,
            Component: ListHorizontalPackages,
        },
    ];

    return (
        <ScreenContainer statusBarBackgroundColor="#ffffff">
            <View className={'bg-white'}>
                <HomeScreenList data={sectionsData} />
            </View>
        </ScreenContainer>
    );
};

export default Index;
