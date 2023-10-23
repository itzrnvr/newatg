import {Text, View} from 'react-native';
import usePackagesViewModel from './viewModels/usePackagesViewModel';
import React, {useEffect} from 'react';
import LoadingModal from '../../../../components/LoadingModal';
import PrimaryButton from '../../../activate-keys/components/PrimaryButton';
import Toast from 'react-native-toast-message';
import PackagesList from '../PackagesList';
import {wait} from 'utils/misc';

function PackagesScreen() {
    const viewModel = usePackagesViewModel();

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
        viewModel.fetchMainVideos();
    }, []);

    useEffect(() => {
        if (viewModel.error) {
            errorToast('Something went wrong!', viewModel.error?.message);
        }
    }, [viewModel.error]);

    if (viewModel.loading) {
        return <LoadingModal isLoading={viewModel.loading} />;
    }

    if (viewModel.packages.length === 0) {
        return (
            <View className={'h-full items-center justify-center'}>
                <View className={'w-full px-12'}>
                    <PrimaryButton
                        title={'retry'}
                        onPress={viewModel.fetchMainVideos}
                        currentLoading={false}
                    />
                </View>
            </View>
        );
    }

    return (
        <View className={'flex-1 justify-center items-center'}>
            <PackagesList
                packages={viewModel.packages}
                onRefresh={viewModel.fetchMainVideos}
            />

            <PrimaryButton
                onPress={viewModel.fetchMainVideos}
                currentLoading={false}
            />
        </View>
    );
}

export default PackagesScreen;
