import {
    Button,
    Dimensions,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import {ScreenContainer} from '../../layouts/ScreenContainer';
import {ListHome} from '../../features/home/components/ListHome';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import PrimaryButton from '../../features/activate-keys/components/PrimaryButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ActivateKeys() {
    // Mock Network Request
    const mockNetworkRequest = () => {
        return new Promise(resolve => setTimeout(resolve, 2000));
    };

    // Mock Network Request
    const mockNetwork = () => {
        console.log('HELLO');
    };
    return (
        <ScreenContainer statusBarBackgroundColor={'#ffffff'}>
            <View className="h-full bg-white">
                <TouchableNativeFeedback>
                    <Image
                        style={{
                            height: 255,
                            width: windowWidth,
                        }}
                        resizeMode={'cover'}
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
                        className={
                            'mt-4 px-4 h-16 bo border-2 rounded-xl border-zinc-700'
                        }
                    />
                    <View className={'mt-8'}>
                        <PrimaryButton onPress={mockNetworkRequest} />
                    </View>
                </View>
            </View>
        </ScreenContainer>
    );
}

export default ActivateKeys;
