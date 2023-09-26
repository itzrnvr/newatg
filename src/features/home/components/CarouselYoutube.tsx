import React, {FC, useState} from 'react';
import {View, Dimensions, StyleSheet, Text, Image} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {YoutubeCarouselItem} from '../store/YoutubeCarouselStore';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome6';

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

const showToast = () => {
    Toast.show({
        type: 'success',
        text1: 'TAPPED',
        text2: 'Tapped',
    });
};

const CarouselItem: FC<CarouselItem> = ({item}) => (
    <TouchableNativeFeedback onPress={() => showToast()}>
        <View
            className={
                'p-[0.5px] relative bg-[#B79FFE] h-full rounded-[12px] justify-center items-center'
            }>
            <Image
                className={
                    'h-full w-full rounded-[12px]'
                }
                source={require('../../../assets/youtube_thumbnailex.png')}
            />

            {/*<Text>{item.video_title}</Text>*/}

            <View
                className={
                    'bg-gray-700 h-full opacity-[0.1] rounded-[12px] w-full absolute bottom-0'
                }
            />

            <View
                className={
                    'bg-indigo-400 justify-center items-center h-14 w-14 rounded-full absolute bottom-5 right-8'
                }>
                <Icon name="play" size={24} color="#ffffff" />
            </View>
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
        height: 230,
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
