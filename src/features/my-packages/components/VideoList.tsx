import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {VideoDetails} from '../services/myPackagesApiService';
import Icon from 'react-native-remix-icon';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

type VideoListProps = {
    videos: VideoDetails[];
    onPress: (item: VideoDetails) => void;
};

interface ListItemProps {
    item: VideoDetails;
    index: number;
    onPress: (item: VideoDetails) => void;
    selected: number;
    setSelected: (item: number) => void;
}

const renderItem = ({
    item,
    index,
    onPress,
    selected,
    setSelected,
}: ListItemProps) => (
    <View className={`t-3.5 px-4 ${selected === index && 'bg-gray-200'}`}>
        <TouchableNativeFeedback
            onPressIn={() => setSelected(index)}
            onPress={() => {
                onPress(item);
            }}
            onPressOut={() => setSelected(-1)}
            className={'flex-row items-center '}>
            <Icon name={'play-circle-fill'} size={48} color="#5585FF" />
            <Text className={'ml-4 text-black text-[18px]'}>{item.title}</Text>
        </TouchableNativeFeedback>
        <View className={'mt-3.5 bg-gray-600 h-[0.8px]'} />
    </View>
);

const VideoList = ({videos, onPress}: VideoListProps) => {
    const [selected, setSelected] = useState<number>(-1);
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={videos}
            renderItem={({item, index}) =>
                renderItem({
                    item,
                    index,
                    onPress: item => {
                        onPress(item);
                    },
                    selected,
                    setSelected,
                })
            }
            keyExtractor={(item, index) => index + ''}
        />
    );
};

export default VideoList;
