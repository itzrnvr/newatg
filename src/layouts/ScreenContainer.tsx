import React, {ReactNode} from 'react';
import {SafeAreaView, View, StyleSheet, ActivityIndicator} from 'react-native';

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
            {loading && (
                <></>
                // <LoaderScreen
                //     backgroundColor={Colors.white}
                //     color={Colors.blue30}
                //     message="Loading..."
                //     overlay
                // />
            )}
        </>
    );
};
