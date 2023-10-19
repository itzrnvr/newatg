import React, {useRef} from 'react';
import {Home} from './src/screens/home/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivateKeys from './src/screens/activate-keys/ActivateKeys';

export type StackParamList = {
    Home: undefined;
    ActivateKeys: undefined;
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
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </GestureHandlerRootView>
    );
};

export default App;
