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
import TabsMyPackages from '../../features/my-packages/components/TabsMyPackages';
import {NavigationContainer} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MyPackages() {
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
                <TabsMyPackages />
            </View>
        </ScreenContainer>
    );
}

export default MyPackages;
