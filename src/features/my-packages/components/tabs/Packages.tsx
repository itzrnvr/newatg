import {View} from 'react-native';
import usePackagesViewModel from './viewModels/usePackagesViewModel';
import React, {useEffect, useState} from 'react';
import LoadingModal from '../../../../components/LoadingModal';
import PrimaryButton from '../../../activate-keys/components/PrimaryButton';
import Toast from 'react-native-toast-message';
import PackageList from '../PackageList';
import {Package, VideoDetails} from '../../services/myPackagesApiService';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../../../../App';
import {makeSecureRequest} from '../../../video-playback/services/networkEncryptionService';
import {useDrmStore} from '../../../video-playback/store';
import {ScreenContainer} from '../../../../layouts/ScreenContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const PackagesScreen = ({
    route,
}: NativeStackScreenProps<StackParamList, 'Packages'>) => {
    const {key} = route.params;
    const viewModel = usePackagesViewModel();
    const navigation = useNavigation<NavigationProp<StackParamList>>();
    const {encryptedVideoKey, authKey, setKeys} = useDrmStore();
    const [currentVideoItem, setCurrentVideoItem] =
        useState<VideoDetails | null>(null);

    const [loading, setLoading] = useState(false);

    const [videos, setVideos] = useState<Package[]>([]);

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

    const fetchEncryptedKey = async (item: VideoDetails) => {
        setLoading(true);
        setKeys('', '');
        console.log(item.video_id);
        try {
            const {authKey, privateKey} = await makeSecureRequest(
                item.video_id,
            );
            setKeys(authKey, privateKey);
            setLoading(false);
            setCurrentVideoItem(item);
            console.log('keysSet');
        } catch (e) {
            setLoading(false);
            errorToast();
        }
    };

    const handleOnPackageItemClick = (item: VideoDetails) => {
        fetchEncryptedKey(item);
    };

    useEffect(() => {
        if (currentVideoItem != null) {
            setCurrentVideoItem(null);
            navigation.navigate('VideoPlayback', {
                videoDetails: currentVideoItem,
            });
        }
    }, [currentVideoItem]);

    useEffect(() => {
        viewModel.fetchMainVideos();
        setKeys('', '');
    }, []);

    useEffect(() => {
        if (viewModel.error) {
            errorToast('Something went wrong!', viewModel.error?.message);
            viewModel.resetError();
        }
    }, [viewModel.error]);

    useEffect(() => {
        console.log('PACKAGES', key?.serial_key);
        setVideos(
            viewModel.packages.filter(
                item => item.serial_key === key?.serial_key,
            ),
        );
    }, [viewModel.packages]);

    useEffect(() => {
        console.log(videos);
    }, [videos]);

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
        <ScreenContainer loading={loading}>
            <View className={'w-full pr-0.5'}>
                <PackageList
                    onPress={(item: VideoDetails) =>
                        handleOnPackageItemClick(item)
                    }
                    packages={videos}
                    onRefresh={viewModel.fetchMainVideos}
                />
            </View>
        </ScreenContainer>
    );
};

export default PackagesScreen;
