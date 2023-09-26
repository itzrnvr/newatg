import React, {FC, useState} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {YoutubeCarouselItem} from '../store/YoutubeCarouselStore';

const DATA = [
    {id: '1', backgroundColor: 'tomato'},
    {id: '2', backgroundColor: 'skyblue'},
    {id: '3', backgroundColor: 'palegreen'},
    // Add more items here
];

const {width, height} = Dimensions.get('window');

interface CarouselItem {
    item: YoutubeCarouselItem;
}

const CarouselItem: FC<CarouselItem> = ({item}) => (
    <TouchableNativeFeedback>
        <View
            className={
                'bg-[#B79FFE] h-full rounded-[12px] justify-center items-center'
            }>
            <Text>{item.video_title}</Text>
        </View>
    </TouchableNativeFeedback>
);

interface YoutubeCarouselPropTypes {
    carouselData: YoutubeCarouselItem[];
}

const YoutubeCarousel: FC<YoutubeCarouselPropTypes> = ({carouselData = []}) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const renderPagination = () => {
        return (
            <Pagination
                dotsLength={carouselData.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };

    return (
        <View className={'mt-5'} style={styles.mainContainer}>
            <Carousel
                layout={'default'}
                layoutCardOffset={9}
                data={carouselData}
                renderItem={({item}) => <CarouselItem item={item} />}
                sliderWidth={width - 28}
                itemWidth={width - 28}
                itemHeight={40}
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

export default YoutubeCarousel;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 220,
        // borderColor: 'red',
        // borderWidth: 2,
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
        backgroundColor: '#B79FFE',
    },
});
