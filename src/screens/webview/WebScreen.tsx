import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../../../App';
import {ScreenContainer} from '../../layouts/ScreenContainer';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LoadingModal from '../../components/LoadingModal';
import Toast from 'react-native-toast-message';

const WebScreen = ({
    route,
    navigation,
}: NativeStackScreenProps<StackParamList, 'WebScreen'>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean | null>(null);

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

    useEffect(() => {
        setLoading(true);
    }, []);

    useEffect(() => {
        if (error) {
            setLoading(false);
            setError(null);
            errorToast();
            navigation.goBack();
        }

        console.log(loading);
    }, [loading, error]);

    return (
        <ScreenContainer loading={loading}>
            <WebView
                className={'h-full w-full'}
                source={{uri: route.params.uri}}
                startInLoadingState={true}
                onLoad={syntheticEvent => {
                    const {nativeEvent} = syntheticEvent;
                    setLoading(false);
                }}
                onLoadEnd={syntheticEvent => {
                    // update component to be aware of loading status
                    const {nativeEvent} = syntheticEvent;
                    setLoading(nativeEvent.loading);
                }}
                onError={() => setError(true)}
            />
        </ScreenContainer>
    );
};

export default WebScreen;
