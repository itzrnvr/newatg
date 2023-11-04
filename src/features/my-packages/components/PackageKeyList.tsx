import {FlatList, Text, View} from 'react-native';
import Icon from 'react-native-remix-icon';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Serial} from '../services/seriaKeyListStatusApiService';
import {useEffect} from 'react';
import usePackagesViewModel from './tabs/viewModels/usePackagesViewModel';
import {series} from '@react-navigation/native/lib/typescript/src/useLinking';
import PackageKeyItem from './PackageKeyItem';
import {KeyClickType} from '../store/useSerialKeyStatusStore';

const PackageKeyList = ({
    categoryName,
    keys,
}: {
    categoryName: string;
    keys: Serial[];
}) => {
    const viewModel = usePackagesViewModel();

    useEffect(() => {
        console.log(categoryName, keys);
    }, []);

    return (
        <FlatList
            data={keys}
            renderItem={({item}) =>
                PackageKeyItem({
                    categoryName: categoryName,
                    item,
                    onItemClick: (keyClickType: KeyClickType) =>
                        viewModel.onItemClick(keyClickType),
                })
            }
        />
    );
};

export default PackageKeyList;
