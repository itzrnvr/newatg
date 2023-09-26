import React, {FC, useState} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const DATA = [
    {id: '1', backgroundColor: 'tomato'},
    {id: '2', backgroundColor: 'skyblue'},
    {id: '3', backgroundColor: 'palegreen'},
    // Add more items here
];

const {width, height} = Dimensions.get('window');

interface CarouselItem {
    title: string;
}
const CarouselItem: FC<CarouselItem> = ({title}) => (
    <TouchableNativeFeedback>
        <View
            className={
                'bg-[#B79FFE] h-full rounded-[12px] justify-center items-center'
            }>
            <Text>{title}</Text>
        </View>
    </TouchableNativeFeedback>
);

// interface YoutubeCarouselPropTypes {
//     carouselData: YoutubeCarouselItem[];
// }

const CarouselKeys = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <View className={'mt-4'} style={styles.mainContainer}>
            <Carousel
                layout={'default'}
                layoutCardOffset={9}
                data={DATA}
                renderItem={({item}) => <CarouselItem title={item.id} />}
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

export default CarouselKeys;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 96,
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
