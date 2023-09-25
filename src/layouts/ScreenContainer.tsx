import React, {ReactNode} from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    ActivityIndicator,
    Modal,
} from 'react-native';

interface ScreenContainerProps {
    safeAreaViewEnabled?: boolean;
    loading?: boolean;
    children: ReactNode;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
    children,
    safeAreaViewEnabled = true,
    loading = false,
}) => {
    return (
        <>
            {!loading &&
                (safeAreaViewEnabled ? (
                    <SafeAreaView className="h-full">{children}</SafeAreaView>
                ) : (
                    <View className="h-full">{children}</View>
                ))}
            {loading && <LoadingModal isLoading={loading} />}
        </>
    );
};

type LoadingModalProps = {
    isLoading: boolean;
};

const LoadingModal = ({isLoading}: LoadingModalProps) => (
    <Modal
        transparent={true}
        animationType={'none'}
        visible={isLoading}
        onRequestClose={() => console.log('close modal')}>
        <View className={'h-full justify-center items-center bg-white'}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    animating={true}
                    size="large"
                    color="#0000ff"
                />
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
