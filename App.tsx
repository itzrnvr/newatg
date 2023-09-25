import React, {useRef} from 'react';
import {Home} from './src/screens/home/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const App = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Home />
            <Toast />
        </GestureHandlerRootView>
    );
};

export default App;
