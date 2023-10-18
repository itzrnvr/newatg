import React, {FC, useState} from 'react';
import {Text, FlatList} from 'react-native';
import CarouselYoutube from './CarouselYoutube';
import {YoutubeCarouselItem} from '../store/YoutubeCarouselStore';
import Header from './Header';
import CarouselKeys from './CarouselKeys';
import GridHomeAction from './GridHomeAction';
import {RefreshControl} from 'react-native';
import {wait} from 'utils/misc';
import MidSectionImage from './MidSectionImage';

export type ListHomeItem = {
    type: 'header' | 'carousel' | 'midSectionImage' | 'keysCarousel' | 'grid';
    id: string;
    data?: YoutubeCarouselItem[];
};

type ListHomeProps = {
    componentsToRender: ListHomeItem[];
};

export function ListHome({componentsToRender}: ListHomeProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const requestRefresh = async () => {
        setIsRefreshing(true);
        await wait(500);
        setIsRefreshing(false);
    };

    const renderItem = ({item}: {item: ListHomeItem}) => {
        switch (item.type) {
            case 'header':
                return <Header />;
            case 'carousel':
                return (
                    <CarouselYoutube
                        carouselData={item.data as YoutubeCarouselItem[]}
                    />
                );

            case 'midSectionImage':
                return <MidSectionImage />;

            case 'keysCarousel':
                return <CarouselKeys />;

            case 'grid':
                return <GridHomeAction />;
            default:
                return null;
        }
    };

    return (
        <FlatList
            refreshing={isRefreshing}
            onRefresh={requestRefresh}
            showsVerticalScrollIndicator={false}
            data={componentsToRender}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
}
