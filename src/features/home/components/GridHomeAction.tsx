import {FlatList, Image, ImageSourcePropType, Text, View} from 'react-native';

import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-remix-icon';
import React from 'react';
import {Dimensions} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../../../App';
import VideoPlayback from '../../../screens/videoPlayback/VideoPlayback';
import {baseUrl, buyNow, website} from 'utils/Constants';
import webScreen from '../../../screens/webview/WebScreen';
import {useHomeInteractiveEventsStore} from '../store/homeInteractiveEventsStore';
import GridList from "./GridList";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const numColumns = 2;
const gutterSize = 8; // the gap between item

const data: GridHomeActionItem[] = [
    {
        id: 0,
        key: 'My Packages',
        asset: require(`../../../assets/newVideoIcon.png`),
        uri: null,
        screen: 'MyPackages',
    },
    {
        id: 1,
        key: 'Activate Keys',
        asset: require(`../../../assets/activatekey.png`),
        uri: null,
        screen: 'ActivateKeys',
    },
    {
        id: 2,
        key: 'Assessment',
        asset: require(`../../../assets/assessment.png`),
        uri: `https://awakenthegenius.org/awakenpanel/website/cn_assessment_test/verify_user`,
        screen: 'WebScreen',
    },
    {
        id: 3,
        key: 'Strength finder',
        asset: require(`../../../assets/strengthfinder.png`),
        uri: `https://awakenthegenius.org/awakenpanel/cn_website/strength`,
        screen: 'WebScreen',
    },
    // Add more items here
];

interface GridHomeActionItem {
    id: number;
    key: string;
    asset: ImageSourcePropType;
    uri: string | null;
    screen: string | null;
}

interface RenderItemProps {
    item: GridHomeActionItem;
    onPress: (item: GridHomeActionItem) => void;
    scrolling: boolean;
}

const renderItem = ({item, onPress, scrolling}: RenderItemProps) => {
    return (
        <TouchableNativeFeedback
            disabled={scrolling}
            className={`h-[200px] ${
                item.id % 2 === 0 ? 'ml-2 mt-2' : 'm-2 mr-2.5'
            }`}
            style={{
                width: windowWidth * 0.45,
                height: windowHeight * 0.22,
            }}
            onPress={() => onPress(item)}>
            <View className={'justify-center items-center'}>
                <Image
                    style={{
                        width: windowWidth * 0.45,
                        height: windowHeight * 0.175,
                    }}
                    resizeMode={'cover'}
                    source={item.asset}
                />
                <Text className={'text-slate-950'}>{item.key}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

export interface GridHomeActionProps {}

const GridHomeAction = () => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();
    const {scrolling, setScrolling} = useHomeInteractiveEventsStore();

    const handleItemClick = (item: GridHomeActionItem) => {
        !item.uri
            ? navigation.navigate(item.screen)
            : navigation.navigate('WebScreen', {uri: item.uri});
    };

    return (
        <View className={'mt-8'}>
            <View className={'mx-3.5'} style={{height: windowHeight * 0.28}}>
                <TouchableNativeFeedback
                    disabled={scrolling}
                    className={'h-[234px] w-full'}
                    onPress={() =>
                        navigation.navigate('WebScreen', {uri: buyNow})
                    }>
                    <Image
                        style={{
                            width: windowWidth - 28, //imported from Dimensions API
                            height: windowHeight * 0.25,
                            borderRadius: 22,
                        }}
                        resizeMode={'cover'}
                        source={require('../../../assets/buykey.png')}
                    />
                </TouchableNativeFeedback>
            </View>
            <View className={'mt-2 w-full justify-center items-center'}>
                <GridList />
            </View>

            <View className={'rounded-2xl mb-16 mx-4 h-20 mt-14'}>
                <TouchableNativeFeedback
                    disabled={scrolling}
                    onPress={() =>
                        navigation.navigate('WebScreen', {uri: website})
                    }
                    className={
                        'justify-center items-center rounded-2xl h-full w-full bg-[#5585FF] opacity-95'
                    }>
                    <Text className={'text-xl text-white'}>
                        Explore Our Website
                    </Text>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
};

export default GridHomeAction;
