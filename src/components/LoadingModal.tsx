import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

type LoadingModalProps = {
    isLoading: boolean;
};

const LoadingModal: React.FC<LoadingModalProps> = ({isLoading}) => (
    <Modal
        transparent={true}
        animationType={'none'}
        visible={isLoading}
        onRequestClose={() => console.log('close modal')}>
        <View className={'h-full flex justify-center items-center bg-white'}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    animating={isLoading}
                    size={50} // changed the size here
                    color="#6366f1"
                />
            </View>
        </View>
    </Modal>
);

export default LoadingModal;

const styles = StyleSheet.create({
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 200, // changed height here
        width: 200, // changed width here
        borderRadius: 50, // changed the borderRadius to make it circular
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
