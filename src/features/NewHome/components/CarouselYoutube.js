import React, {FC, useState} from 'react';
import {View, Dimensions, StyleSheet, Text, Image, Linking} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import SnapCarousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-remix-icon';
import {useHomeInteractiveEventsStore} from '../../home/store/homeInteractiveEventsStore';

const {width, height} = Dimensions.get('window');

const CarouselItem = ({item}) => {
    const {scrolling} = useHomeInteractiveEventsStore();

    return (
        <TouchableNativeFeedback
            disabled={scrolling}
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
};

const CarouselYoutube = ({data = []}) => {
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

export default CarouselYoutube;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
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
