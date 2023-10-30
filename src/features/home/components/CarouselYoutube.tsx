import React, {FC, useState} from 'react';
import {View, Dimensions, StyleSheet, Text, Image, Linking} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {YoutubeCarouselItem} from '../store/YoutubeCarouselStore';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-remix-icon';

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
    <TouchableNativeFeedback
        onPress={() => Linking.openURL(item.video_ytube_link)}>
        <View className={'items-center'}>
            <Image
                style={{resizeMode: 'cover'}}
                className={'h-[200] w-full rounded-[12px]'}
                source={require('../../../assets/youtube.png')}
            />

            <Text
                numberOfLines={1}
                className={'mt-3.5 mx-2 text-lg text-slate-950 '}
                style={{fontFamily: 'Roboto-Regular'}}>
                {item.video_title}
            </Text>
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
        <View className={'px-3 mt-8 h-[300px]'} style={styles.mainContainer}>
            <View className={'mb-2 flex-row items-center'}>
                <Icon name="youtube-fill" size="38" color="red" />
                <Text
                    className={'ml-1.5 text-[18px] text-slate-950'}
                    style={{fontFamily: 'Roboto-Regular'}}>
                    Checkout Our Youtube
                </Text>
            </View>

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
        </View>
    );
};

export default YoutubeCarousel;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
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
        height: 190,
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
