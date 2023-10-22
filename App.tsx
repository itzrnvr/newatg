import React, {useRef} from 'react';
import {Home} from './src/screens/home/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivateKeys from './src/screens/activate-keys/ActivateKeys';
import MyPackages from "./src/screens/myPackages/MyPackages";

export type StackParamList = {
    Home: undefined;
    ActivateKeys: undefined;
    MyPackages: undefined;
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
                    />
                    <Stack.Screen name="MyPackages" component={MyPackages} />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </GestureHandlerRootView>
    );
};

export default App;
