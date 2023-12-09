import React, {FC, useEffect, useState} from 'react';
import {View, Dimensions, StyleSheet, Text, Image, Linking} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import SnapCarousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-remix-icon';
import {useHomeInteractiveEventsStore} from '../../home/store/homeInteractiveEventsStore';
import {hexToRGBA} from "utils/misc";

const {width, height} = Dimensions.get('window');

const CarouselItem = ({item}) => {
    const {scrolling} = useHomeInteractiveEventsStore();

    useEffect(() => {
        console.log(item);
    }, []);

    return (
        <TouchableNativeFeedback
            disabled={scrolling}
            onPress={() => Linking.openURL(item.url)}>
            <View className={'items-center'}>
                <Image
                    style={{resizeMode: 'cover'}}
                    className={'h-[228px] w-full rounded-[12px]'}
                    source={{uri: item.thumbnailUrl}}
                />
            </View>
        </TouchableNativeFeedback>
    );
};

const Carousel = ({data = []}) => {
    return (
        <View className={`px-3 py-8 h-[300px] justify-center items-center flex-row`} style={styles.mainContainer}>
            <SnapCarousel
                layout={'default'}
                layoutCardOffset={9}
                data={data}
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
            />
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        backgroundColor: 'rgba(253,178,137,0.40)',
    },
    item: {
        width: '100%',
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        height: 228,
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
