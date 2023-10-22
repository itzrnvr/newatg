import {
    ActivityIndicator,
    Button,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

// TypeScript Interface for Props
interface PrimaryButtonProps {
    onPress: (() => void) | (() => Promise<any>);
    currentLoading: boolean;
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onPress,
    currentLoading,
}) => {
    const [loading, setLoading] = useState(false);

    const onButtonPress = async () => {
        setLoading(true);
        let result = onPress();
        if (typeof result?.then === 'function') {
            await result;
        }
        setLoading(false);
    };

    return (
        <TouchableNativeFeedback onPress={onButtonPress}>
            <View
                className={
                    'py-4 bg-blue-500 rounded-lg justify-center items-center'
                }>
                {loading || currentLoading ? (
                    <ActivityIndicator size={30} color={'#ffffff'} />
                ) : (
                    <Text className={'text-white text-lg'}>Activate</Text>
                )}
            </View>
        </TouchableNativeFeedback>
    );
};

export default PrimaryButton;
