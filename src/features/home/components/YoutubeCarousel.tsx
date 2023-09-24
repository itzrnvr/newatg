import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const DATA = [
    {id: '1', backgroundColor: 'tomato'},
    {id: '2', backgroundColor: 'skyblue'},
    {id: '3', backgroundColor: 'palegreen'},
    // Add more items here
];

const {width, height} = Dimensions.get('window');

const CarouselItem = () => (
    <View style={[styles.item, {backgroundColor: 'red'}]} />
);

const MyCarousel = () => {
    return (
        <Carousel
            data={DATA}
            renderItem={({item}) => <CarouselItem {...item} />}
            sliderWidth={width}
            itemWidth={width - 60} // This ensures you can see a piece of the next item.
            inactiveSlideScale={0.9} // Scales down the inactive slides
            inactiveSlideOpacity={0.7} // Fades out the inactive slides
            containerCustomStyle={styles.carousel}
            activeSlideAlignment={'center'}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        width: '100%',
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 1,
    },
});

export default MyCarousel;
