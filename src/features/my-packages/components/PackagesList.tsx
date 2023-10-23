import {FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Package, VideoDetails} from '../services/myPackagesApiService';
import VideoList from './VideoList';
import {wait} from 'utils/misc';

type PackagesListProps = {
    packages: Package[];
    onRefresh: () => void;
    onPress: (item: VideoDetails) => void;
};

const renderItem = ({
    item,
    onPress,
}: {
    item: Package;
    onPress: (item: VideoDetails) => void;
}) => (
    <View className={'w-full'}>
        <View className={'mb-4 bg-blue-800 mt-2 rounded-lg w-full py-4 items-center'}>
            <Text className={'text-white font-bold text-xl'}>{item.title}</Text>
        </View>

        <VideoList videos={item.data} onPress={onPress} />
    </View>
);
const PackagesList = ({packages, onRefresh, onPress}: PackagesListProps) => {
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

export default PackagesList;
