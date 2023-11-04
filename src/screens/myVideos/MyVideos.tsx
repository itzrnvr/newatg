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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../../../App';

const MyVideos = ({
    route,
}: NativeStackScreenProps<StackParamList, 'MyVideos'>) => {
    const {key} = route.params;
    const viewModel = usePackagesViewModel();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({title: key.title});
        viewModel.fetchMainVideos();
    }, []);

    return (
        <ScreenContainer
            statusBarBackgroundColor={'#ffffff'}
            loading={viewModel.keyStatusLoading}>
            <TabsMyPackages serial={key} />
        </ScreenContainer>
    );
};

export default MyVideos;
