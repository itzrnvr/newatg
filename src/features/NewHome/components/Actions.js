import React from 'react';
import {FlatList, Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-remix-icon';
import tailwindColorMap from 'utils/tailwindColors';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {hexToRGBA} from 'utils/misc';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../../../App';
import {useHomeInteractiveEventsStore} from "../../home/store/homeInteractiveEventsStore";

const {width} = Dimensions.get('window');

// Gap between items
const gap = 16;
// Item width calculation: screen width minus twice the gap (for both sides) divided by the number of columns
const itemWidth = (width - 3 * gap) / 2;

const items = [
    {
        key: '1',
        title: 'Video Actions',
        description: 'purple',
        iconName: 'ri-video-line',
        colorName: 'purple',
        screen: 'MyPackages',
        uri: null,
    },
    {
        key: '2',
        title: 'Activate Keys',
        description: 'purple',
        iconName: 'ri-key-2-line',
        colorName: 'blue',
        screen: 'ActivateKeys',
        uri: null,
    },
    {
        key: '3',
        title: 'Take Assessment',
        description: 'purple',
        iconName: 'ri-article-line',
        colorName: 'green',
        screen: 'WebScreen',
        uri: `https://awakenthegenius.org/awakenpanel/website/cn_assessment_test/verify_user`,
    },
    {
        key: '4',
        title: 'Strength Finder',
        description: 'purple',
        iconName: 'ri-muscle-line',
        colorName: 'red',
        screen: 'WebScreen',
        uri: `https://awakenthegenius.org/awakenpanel/cn_website/strength`,
    },
];

const Actions = ({data}) => {
    // renderItem function
    const navigation = useNavigation();
    const {scrolling} = useHomeInteractiveEventsStore();

    const renderItem = ({item}) => {
        const iconBackgroundColor = tailwindColorMap[item.colorName][100];
        const iconColor = tailwindColorMap[item.colorName][500];
        const rippleColor = hexToRGBA(
            tailwindColorMap[item.colorName][500],
            0.1,
        ); // or any hex color you prefer
        const rippleOverflow = false; // false for a bound ripple effect, true to go beyond the view bounds

        const handleItemClick = item => {
            !item.uri
                ? navigation.navigate(item.screen)
                : navigation.navigate('WebScreen', {uri: item.uri});
        };

        return (
            <TouchableNativeFeedback
                disabled={scrolling}
                onPress={() => handleItemClick(item)}
                background={TouchableNativeFeedback.Ripple(
                    rippleColor,
                    rippleOverflow,
                )}
                style={{width: itemWidth}}
                className="bg-white rounded-lg border-slate-600 border m-2 p-4">
                <View className={'flex-row'}>
                    <View
                        style={{backgroundColor: iconBackgroundColor}}
                        className={`p-3 self-start rounded-lg`}>
                        <Icon
                            name={item.iconName}
                            size={36}
                            color={iconColor}
                        />
                    </View>
                    <View className={'absolute right-0'}>
                        <Icon
                            name={'ri-arrow-right-line'}
                            size={34}
                            color={iconColor}
                        />
                    </View>
                </View>
                <Text
                    style={{fontFamily: 'RobotoSlab-SemiBold'}}
                    className={'text-zinc-500 mt-4 text-[16px] w-28'}>
                    {item.title}
                </Text>

                <Text
                    style={{fontFamily: 'Lato-Regular'}}
                    className={'mt-1 text-zinc-500 text-md'}>
                    Access all your activated packages here.
                </Text>
            </TouchableNativeFeedback>
        );
    };

    return (
        <View className={'bg-blue-900 py-8  w-full justify-center items-center'}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                // Apply the padding to FlatList, this will also affect the calculation for the item width
                contentContainerClassName="p-2"
                // Custom style to apply horizontal margin
                style={{marginHorizontal: gap / 2}}
                numColumns={2} // Arrange into 2-item rows
            />
        </View>
    );
};

export default Actions;
