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
import {ListHome} from '../../features/home/components/ListHome';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import PrimaryButton from '../../features/activate-keys/components/PrimaryButton';
import {fetchKeyStatus} from '../../features/activate-keys/services/activateKeysApiService';
import useActivateKeysViewModel from '../../features/activate-keys/view-model/useActivateKeysViewModel';
import Toast from 'react-native-toast-message';
import {err} from 'react-native-svg/lib/typescript/xml';
import {tagMessage} from 'react-native-gesture-handler/lib/typescript/utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const successToast = () => {
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Key Activated!',
    });
};

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

function ActivateKeys() {
    const viewModel = useActivateKeysViewModel();

    useEffect(() => {
        if (viewModel.error) {
            errorToast('Error', viewModel.error?.message);
        }

        if (viewModel.success) {
            successToast();
        }
    }, [viewModel.error, viewModel.success]);

    return (
        <ScreenContainer statusBarBackgroundColor={'#ffffff'}>
            <View className="h-full bg-white">
                <TouchableNativeFeedback>
                    <Image
                        style={{
                            height: 224,
                            width: windowWidth,
                        }}
                        resizeMode={'contain'}
                        source={require('../../assets/validatekeys.png')}
                    />
                </TouchableNativeFeedback>

                <View className={'ml-4 mt-4 mr-4'}>
                    <Text
                        style={{fontFamily: 'Roboto-Regular'}}
                        className={'text-xl text-zinc-600'}>
                        Enter Serial Key
                    </Text>

                    <TextInput
                        placeholder={'xxxxxxxxxxxxxxxxxxxxxx'}
                        autoFocus={true}
                        value={viewModel.serialKey}
                        onChangeText={text => viewModel.setSerialKey(text)}
                        className={
                            'text-black mt-4 px-4 h-14 bo border-2 rounded-xl border-zinc-700'
                        }
                    />
                    <View className={'mt-8'}>
                        <PrimaryButton
                            onPress={viewModel.submitKey}
                            currentLoading={viewModel.loading}
                        />
                    </View>
                </View>
            </View>
        </ScreenContainer>
    );
}

export default ActivateKeys;
