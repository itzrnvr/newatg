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
import TabsMyPackages from '../../features/my-packages/components/TabsMyPackages';


function MyPackages() {
    
    return (
        <ScreenContainer statusBarBackgroundColor={'#ffffff'}>
            <View className="h-full bg-white">
                <TabsMyPackages />
            </View>
        </ScreenContainer>
    );
}

export default MyPackages;
