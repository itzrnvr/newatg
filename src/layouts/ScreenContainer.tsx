import React, {ReactNode} from 'react';
import {SafeAreaView, StatusBar, StatusBarStyle, View} from 'react-native';
import LoadingModal from '../components/LoadingModal';

interface ScreenContainerProps {
    safeAreaViewEnabled?: boolean;
    loading?: boolean;
    children: ReactNode;
    statusBarBackgroundColor?: string;
    statusBarStyle?: StatusBarStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
    children,
    safeAreaViewEnabled = true,
    loading = false,
    statusBarBackgroundColor = '#ffffff',
    statusBarStyle = 'dark-content',
}) => {
    return (
        <>
            <StatusBar
                backgroundColor={statusBarBackgroundColor}
                barStyle={statusBarStyle}
            />
            {loading && <LoadingModal isLoading={loading} />}
            {safeAreaViewEnabled ? (
                <SafeAreaView className="h-full">{children}</SafeAreaView>
            ) : (
                <View className="h-full">{children}</View>
            )}
        </>
    );
};
