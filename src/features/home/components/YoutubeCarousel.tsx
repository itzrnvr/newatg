import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const DATA = [
    {id: '1', backgroundColor: 'tomato'},
    {id: '2', backgroundColor: 'skyblue'},
    {id: '3', backgroundColor: 'palegreen'},
    // Add more items here
];

const {width, height} = Dimensions.get('window');

const CarouselItem = ({backgroundColor}) => (
    <View style={[styles.item, {backgroundColor}]} />
);

const MyCarousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const renderPagination = () => {
        return (
            <Pagination
                dotsLength={DATA.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };

    return (
        <View style={styles.mainContainer}>
            <Carousel
                layout={'default'}
                layoutCardOffset={9}
                data={DATA}
                renderItem={({item}) => <CarouselItem {...item} />}
                sliderWidth={width}
                itemWidth={width - 20}
                sliderHeight={height}
                itemHeight={height}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.carousel}
                activeSlideAlignment={'center'}
                swipeThreshold={10}
                lockScrollWhileSnapping={true}
                enableMomentum={false}
                decelerationRate={0.25}
                onSnapToItem={index => setActiveSlide(index)}
            />
            {renderPagination()}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    item: {
        width: '100%',
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 1,
    },
    paginationContainer: {
        paddingVertical: 8,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8,
        backgroundColor: 'skyblue',
    },
});

export default MyCarousel;
