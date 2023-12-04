import React from 'react';
import {Serial} from '../services/seriaKeyListStatusApiService';
import usePackagesViewModel from './tabs/viewModels/usePackagesViewModel';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import Icon from 'react-native-remix-icon';
import {KeyClickType} from '../store/useSerialKeyStatusStore';
import tailwindColorMap from 'utils/tailwindColors';

const PackageKeyItem = ({
    categoryName,
    item,
    onItemClick,
}: {
    categoryName: string;
    item: Serial;
    onItemClick: (keyClickType: KeyClickType) => void;
}) => {
    return (
        <TouchableNativeFeedback
            className={'my-2'}
            onPress={() => onItemClick({type: categoryName, key: item})}>
            <View
                className={`${categoryName === 'Active' && `bg-blue-500`}
                    ${categoryName === 'Available' && `bg-green-500`}
                    ${categoryName === 'Expired' && `bg-red-500`}
                    mx-2 px-3 py-4 flex-row items-center rounded-xl space-x-3`}>
                <Icon
                    name={`${
                        categoryName === 'Active' ? 'movie-fill' : 'key-2-line'
                    }`}
                    color={'#ffffff'}
                    size={48}
                />
                <View className={'ml-3.5 space-y-2'}>
                    <Text className={'text-white font-semibold text-lg'}>
                        {item.title}
                    </Text>
                    <View className={'flex-row opacity-90'}>
                        <Text className={'text-white'}>
                            {item.activate_date}
                        </Text>
                        <Text className={'text-white'}>{' - '}</Text>
                        <Text className={'text-white'}>{item.expiry_date}</Text>
                    </View>
                </View>
                <Text className={'text-lg font-light text-white'}>
                    {categoryName}
                </Text>
            </View>
        </TouchableNativeFeedback>
    );
};

export const PackageKeyItem2 = ({
    categoryName,
    item,
    onItemClick,
}: {
    categoryName: string;
    item: Serial;
    onItemClick: (keyClickType: KeyClickType) => void;
}) => {
    const iconBackgroundColor = tailwindColorMap.purple[100];
    const iconColor = tailwindColorMap.purple[500];
    return (
        <TouchableNativeFeedback
            className={'m-4 rounded-lg border-slate-600 border p-3.5 flex-row'}
            onPress={() => onItemClick({type: categoryName, key: item})}>
            <View
                style={{backgroundColor: iconBackgroundColor}}
                className={`p-3 self-start rounded-lg`}>
                <Icon name={`ri-video-line`} size={36} color={iconColor} />
            </View>
            <View className={'justify-center'}>
                <Text
                    style={{fontFamily: 'RobotoSlab-SemiBold'}}
                    className={'text-zinc-500 mt-4 text-[16px] w-28'}>
                    {item.title}
                </Text>
                <Text
                    style={{fontFamily: 'Lato-Regular'}}
                    className={'mt-1 text-zinc-500 text-md '}>
                    Access all your activated packages here.
                </Text>
            </View>
        </TouchableNativeFeedback>
    );
};

export default PackageKeyItem;
