import {
    Button,
    Dimensions,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useEffect} from 'react';
import {ScreenContainer} from '../../layouts/ScreenContainer';
import TabsMyPackages from '../../features/my-packages/components/TabsMyPackages';
import PackagesList from '../../features/my-packages/components/PackagesList';
import usePackagesViewModel from '../../features/my-packages/components/tabs/viewModels/usePackagesViewModel';
import {fetchMainVideos} from '../../features/my-packages/services/myPackagesApiService';
import {fetchSerialKeyList} from '../../features/my-packages/services/seriaKeyListApiService';
import {fetchSerialKeyStatusList} from '../../features/my-packages/services/seriaKeyListStatusApiService';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function MyPackages() {
    const viewModel = usePackagesViewModel();
    const navigation = useNavigation();

    useEffect(() => {
        viewModel.fetchKeyStatusList();
    }, []);

    useEffect(() => {
        console.log(viewModel.keyClickType);
        console.log('hello');
        if (
            viewModel.keyClickType &&
            viewModel.keyClickType.type === 'Active'
        ) {
            const key = viewModel.keyClickType.key;
            navigation.navigate('MyVideos', {key: key});
            viewModel.resetKeyClickType();
        }
    }, [viewModel.keyClickType]);

    const errorToast = (
        title: string = 'Something went wrong',
        message: string = 'There seems to be a problem',
    ) => {
        Toast.show({
            type: 'error',
            text1: title,
            text2: message,
        });
    };

    useEffect(() => {
        if (viewModel.keyStatusError) {
            errorToast(
                'Something went wrong!',
                viewModel.keyStatusError?.message,
            );
            viewModel.resetKeyStatusError();
        }
    }, [viewModel.keyStatusError]);

    return (
        <ScreenContainer
            statusBarBackgroundColor={'#ffffff'}
            loading={viewModel.keyStatusLoading}>
            <View className={'mt-2 bg-white'}>
                <PackagesList
                    keys={viewModel.keys}
                    onPress={() => console.log('onPress')}
                    onRefresh={() => viewModel.fetchKeyStatusList()}
                />
            </View>
        </ScreenContainer>
    );
}

export default MyPackages;
