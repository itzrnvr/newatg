import {View, Text, Image, Animated} from 'react-native';
import TouchableRippleIcon from '../../../components/TouchableRippleIcon';
import {useEffect} from 'react';

export default function Header({scrollY}) {
    // Translation from 0 to -100 (the negative value of the header's height)
    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, 50], // The scroll range you want the animation to happen over
        outputRange: [0, -100], // Starts at 0 (fully visible) and translates up to -100 (fully hidden)
        extrapolate: 'clamp',
    });

    // Opacity from 1 (fully visible) to 0 (fully transparent)
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 50], // The scroll range you want the animation to happen over
        outputRange: [1, 0], // Starts at 1 (fully visible) to 0 (invisible)
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            className={'pl-4 bg-[#350453] sticky top-0 z-10'}
            style={{
                transform: [{translateY: headerTranslateY}],
                opacity: headerOpacity,
            }}>
            <View className={'flex-row py-4'}>
                <TouchableRippleIcon
                    className={'flex'}
                    iconName={'ri-arrow-left-line'}
                    iconSize={32}
                    color={'white'}
                />
                <Image
                    className={'absolute right-[-2] top-[-2]'}
                    source={require('../../../assets/cubepattern.png')}
                    resizeMode={'contain'}
                    style={{width: 204, height: 188}}
                />
            </View>
            <View className={'mt-12 mb-5'}>
                <Text
                    className={'text-white'}
                    style={{fontFamily: 'RobotoSlab-Light', fontSize: 26}}>
                    Speed Reading
                </Text>
                <Text
                    className={'text-white'}
                    style={{fontFamily: 'Lato-Regular', fontSize: 14}}>
                    Explore video content below!
                </Text>
            </View>
        </Animated.View>
    );
}
export function CompactHeader({scrollY}) {
    // The same opacity interpolation you already have
    const compactHeaderOpacity = scrollY.interpolate({
        inputRange: [0, 50], // The trigger scroll value can be adjusted
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    // Style for the compact header to overlay the content
    const compactHeaderStyle = {
        opacity: compactHeaderOpacity,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20, // Ensures it stays on top of other content
        // Add any additional styling for your compact header here
    };

    //bg-[#530433]

    return (
        <Animated.View
            style={compactHeaderStyle}
            className={'bg-[#043253] h-16 items-center pl-4 flex-row'}>
            <TouchableRippleIcon
                className={'flex'}
                iconName={'ri-arrow-left-line'}
                iconSize={32}
                color={'white'}
            />

            <Text
                style={{fontFamily: 'RobotoSlab-Light'}}
                className={'ml-4 text-white text-lg'}>
                Packages
            </Text>
        </Animated.View>
    );
}
