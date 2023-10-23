import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {VideoDetails} from '../services/myPackagesApiService';
import Icon from 'react-native-remix-icon';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

type VideoListProps = {
    videos: VideoDetails[];
    onPress: (item: VideoDetails) => void;
};

interface ListItemProps {
    item: VideoDetails;
    onPress: (item: VideoDetails) => void;
}

const renderItem = ({item, onPress}: ListItemProps) => (
    <View className={'mt-3.5 px-4'}>
        <TouchableNativeFeedback
            onPress={() => onPress(item)}
            className={'flex-row items-center '}>
            <Icon name={'play-circle-fill'} size={48} color="#5585FF" />
            <Text className={'ml-4 text-black text-[18px]'}>{item.title}</Text>
        </TouchableNativeFeedback>
        <View className={'mt-3.5 bg-gray-600 h-[0.8px]'} />
    </View>
);

const VideoList = ({videos, onPress}: VideoListProps) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={videos}
            renderItem={({item}) =>
                renderItem({
                    item,
                    onPress: item => {
                        onPress(item);
                    },
                })
            }
            keyExtractor={item => item.title}
        />
    );
};

export default VideoList;
