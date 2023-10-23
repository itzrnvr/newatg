import React, {useRef} from 'react';
import {Home} from './src/screens/home/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivateKeys from './src/screens/activate-keys/ActivateKeys';
import MyPackages from './src/screens/myPackages/MyPackages';
import VideoPlayback from './src/screens/videoPlayback/VideoPlayback';
import {VideoDetails} from './src/features/my-packages/services/myPackagesApiService';

export type StackParamList = {
    Home: undefined;
    ActivateKeys: undefined;
    MyPackages: undefined;
    VideoPlayback: {videoDetails: VideoDetails};
};

const App = () => {
    const Stack = createNativeStackNavigator();

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="ActivateKeys"
                        component={ActivateKeys}
                        options={{title: 'Activate Keys'}}
                    />
                    <Stack.Screen
                        name="MyPackages"
                        component={MyPackages}
                        options={{title: 'My Packages'}}
                    />

                    <Stack.Screen
                        name="VideoPlayback"
                        component={VideoPlayback}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </GestureHandlerRootView>
    );
};

export default App;
