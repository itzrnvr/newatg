import {FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';
import {VideoDetails} from '../services/myPackagesApiService';

type VideoListProps = {
    videos: VideoDetails[];
};

const renderItem = ({item}: {item: VideoDetails}) => (
    <View>
        <Text className={'text-black'}>{item.title}</Text>
    </View>
);

const VideoList = ({videos}: VideoListProps) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={videos}
            renderItem={renderItem}
            keyExtractor={item => item.title}
        />
    );
};

export default VideoList;
