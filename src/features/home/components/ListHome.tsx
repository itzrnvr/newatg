import React, {FC} from 'react';
import {Text, FlatList} from 'react-native';
import CarouselYoutube from './CarouselYoutube';
import {YoutubeCarouselItem} from '../store/YoutubeCarouselStore';
import Header from './Header';
import CarouselKeys from './CarouselKeys';
import GridHomeAction from './GridHomeAction';

export type ListHomeItem = {
    type: 'header' | 'carousel' | 'keysCarousel' | 'grid';
    id: string;
    data?: YoutubeCarouselItem[];
};

type ListHomeProps = {
    componentsToRender: ListHomeItem[];
};

export function ListHome({componentsToRender}: ListHomeProps) {
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
            data={componentsToRender}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
}
