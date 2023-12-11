import React, {useEffect} from 'react';
import {Home} from './src/screens/home/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivateKeys from './src/screens/activate-keys/ActivateKeys';
import MyPackages from './src/screens/myPackages/MyPackages';
import VideoPlayback from './src/screens/videoPlayback/VideoPlayback';
import {VideoDetails} from './src/features/my-packages/services/myPackagesApiService';
import WebScreen from './src/screens/webview/WebScreen';
import SplashScreen from './src/screens/onboarding/SplashScreen';
import OnBoardingScreen from './src/screens/onboarding/OnBoardingScreen';
import MyVideos from './src/screens/myVideos/MyVideos';
import {Serial} from './src/features/my-packages/services/seriaKeyListStatusApiService';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import BottomTabNavigator from './src/components/BottomTabNavigator';
import Profile from './src/screens/profile/Profile';
import Index from './src/screens/NewHome';
import {useAppStore} from './src/store/appStore';
import NavigationComponent from "./src/navigation/NavigationComponent";

export type StackParamList = {
    SplashScreen: undefined;
    OnBoarding: undefined;
    Home: undefined;
    Index: undefined;
    NavigationComponent: undefined;
    ActivateKeys: undefined;
    Profile: undefined;
    MyPackages: undefined;
    MyVideos: {key: Serial};
    Packages: {key: Serial};
    VideoPlayback: {videoDetails: VideoDetails};
    WebScreen: {uri: string};
};

const App = () => {
    const Stack = createNativeStackNavigator();
    const {error} = useAppStore();

    const errorToast = (message: string = 'There seems to be a problem') => {
        Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: message,
        });
    };

    useEffect(() => {
        if (error) {
            errorToast(error);
        }
    }, [error]);

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen">
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="OnBoarding"
                        component={OnBoardingScreen}
                        options={{headerShown: false}}
                    />

                    <Stack.Screen
                        name="Home"
                        component={Home} // Use the BottomTabNavigator we defined earlier
                        options={{headerShown: false}}
                    />

                    <Stack.Screen
                        name="NavigationComponent"
                        component={NavigationComponent}
                        options={{headerShown: false}}
                    />

                    <Stack.Screen
                        name="NewHome"
                        component={Index}
                        options={{headerShown: false}}
                    />

                    <Stack.Screen
                        name="VideoPlayback"
                        component={VideoPlayback}
                        options={{headerShown: false}}
                    />

                    <Stack.Screen
                        name="WebScreen"
                        component={WebScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="ActivateKeys"
                        component={ActivateKeys}
                        options={{
                            headerShown: true,
                            headerTitle: 'Activate Keys Title',
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{title: 'My Profile'}}
                    />
                    <Stack.Screen
                        name="MyPackages"
                        component={MyPackages}
                        options={{title: 'My Actions'}}
                    />
                    <Stack.Screen
                        name="MyVideos"
                        component={MyVideos}
                        options={{title: 'My Videos'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </GestureHandlerRootView>
    );
};

export default App;
