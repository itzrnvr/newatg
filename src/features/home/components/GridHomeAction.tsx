import {FlatList, Image, ImageSourcePropType, Text, View} from 'react-native';

import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-remix-icon';
import React from 'react';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const numColumns = 2;
const gutterSize = 8; // the gap between item

const data: GridHomeActionItem[] = [
    {
        id: 0,
        key: 'My Packages',
        asset: require(`../../../assets/mypackages.png`),
    },
    {
        id: 1,
        key: 'Activate Keys',
        asset: require(`../../../assets/activatekey.png`),
    },
    {
        id: 2,
        key: 'Assessment',
        asset: require(`../../../assets/assessment.png`),
    },
    {
        id: 3,
        key: 'Strength finder',
        asset: require(`../../../assets/strengthfinder.png`),
    },
    // Add more items here
];

interface GridHomeActionItem {
    id: number;
    key: string;
    asset: ImageSourcePropType;
}

interface RenderItemProps {
    item: GridHomeActionItem;
}

const renderItem = ({item}: RenderItemProps) => (
    <TouchableNativeFeedback
        className={`h-[200px] ${
            item.id % 2 === 0 ? 'ml-2 mt-2' : 'm-2 mr-2.5'
        }`}
        style={{
            width: windowWidth * 0.45,
            height: windowHeight * 0.22,
        }}>
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

export interface GridHomeActionProps {}

const GridHomeAction = () => {
    return (
        <View className={'mt-8'}>
            <View className={'mx-3.5'} style={{height: windowHeight * 0.28}}>
                <TouchableNativeFeedback className={'h-[234px] w-full'}>
                    <Image
                        style={{
                            width: windowWidth - 28, //imported from Dimensions API
                            height: windowHeight * 0.28,
                            borderRadius: 22,
                        }}
                        resizeMode={'cover'}
                        source={require('../../../assets/buykey.png')}
                    />
                </TouchableNativeFeedback>
            </View>
            <View
                className={'mt-4 w-full justify-center items-center'}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    numColumns={numColumns}
                />
            </View>

            <View className={'rounded-2xl mb-16 mx-4 h-20 mt-24'}>
                <TouchableNativeFeedback
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
