import {FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Package, VideoDetails} from '../services/myPackagesApiService';
import VideoList from './VideoList';
import {wait} from 'utils/misc';

type PackageListProps = {
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
        <View
            className={
                'mb-4 bg-blue-800 mt-2 rounded-lg w-full py-4 items-center'
            }>
            <Text className={'text-white font-bold text-xl'}>{item.title}</Text>
        </View>

        <VideoList videos={item.data} onPress={onPress} />
    </View>
);
const PackageList = ({packages, onRefresh, onPress}: PackageListProps) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const requestRefresh = async () => {
        setIsRefreshing(true);
        await onRefresh();
        await wait(500);
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
            keyExtractor={(item, index) => index + ''}
        />
    );
};

export default PackageList;
