import {FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Package} from '../services/myPackagesApiService';
import VideoList from './VideoList';
import {wait} from 'utils/misc';

type PackagesListProps = {
    packages: Package[];
    onRefresh: () => void;
};

const renderItem = ({item}: {item: Package}) => (
    <View>
        <Text className={'text-black'}>{item.title}</Text>
        <VideoList videos={item.data} />
    </View>
);
const PackagesList = ({packages, onRefresh}: PackagesListProps) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const requestRefresh = async () => {
        setIsRefreshing(true);
        await onRefresh();
        wait(500);
        setIsRefreshing(false);
    };

    return (
        <FlatList
            refreshing={isRefreshing}
            onRefresh={requestRefresh}
            showsVerticalScrollIndicator={false}
            data={packages}
            renderItem={item => renderItem(item)}
            keyExtractor={item => item.title}
        />
    );
};

export default PackagesList;
