import React, {useCallback, useEffect, useState} from 'react';
import {View, Dimensions, StyleSheet, Image, Linking} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import SnapCarousel from 'react-native-snap-carousel';
import {useHomeInteractiveEventsStore} from '../../home/store/homeInteractiveEventsStore';
import {getColorFromImage} from 'react-native-palette';
import tailwindColorMap from 'utils/tailwindColors';
import {TouchableRipple} from 'react-native-paper';

const {width} = Dimensions.get('window');
const SLIDER_WIDTH = width;
const ITEM_WIDTH = width * 0.8; // 75% of the screen width

const CarouselItem = ({item}) => {
    const {scrolling} = useHomeInteractiveEventsStore();

    useEffect(() => {
        console.log(item);
    }, []);

    return (
        <TouchableRipple
            disabled={scrolling}
            onPress={() => Linking.openURL(item.url)}>
            <View style={styles.item}>
                <Image style={styles.image} source={{uri: item.thumbnailUrl}} />
            </View>
        </TouchableRipple>
    );
};

const Carousel = ({data = []}) => {
    const [bgColor, setBgColor] = useState('rgba(253,178,137,0.4)'); // Default background color

    const updateBackgroundColor = useCallback(
        activeIndex => {
            const currentItem = data[activeIndex];
            if (currentItem) {
                setBgColor(tailwindColorMap[currentItem.bgColor]['50']);
            }
        },
        [data],
    );

    return (
        <View style={[styles.mainContainer, {backgroundColor: bgColor}]}>
            <SnapCarousel
                layout={'default'}
                layoutCardOffset={20}
                data={data}
                renderItem={({item}) => <CarouselItem item={item} />}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.carousel}
                activeSlideAlignment={'center'}
                swipeThreshold={10}
                lockScrollWhileSnapping={true}
                enableMomentum={false}
                decelerationRate={0.25}
                loop={true}
                enableSnap={true}
                autoplay={true}
                onBeforeSnapToItem={updateBackgroundColor}
            />
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        backgroundColor: 'rgba(253,178,137,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8, // Adjust padding as needed
        paddingVertical: 30,
    },
    item: {
        width: ITEM_WIDTH, // Use the constant
        height: 200, // Adjust height as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12,
    },
    carousel: {
        overflow: 'visible', // Make sure slides are not clipped
    },
});
