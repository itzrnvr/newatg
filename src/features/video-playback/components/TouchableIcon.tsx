import Icon from 'react-native-remix-icon';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

interface TouchableIconProps {
    iconName: string;
    iconSize: number;
    color: string;
    padding?: number;
    onPress: () => void;
    onPressIn: () => void;
    onPressOut: () => void;
}

const TouchableIcon = ({
    iconName,
    iconSize,
    onPress,
    onPressIn,
    onPressOut,
    color,
    padding = 8,
}: TouchableIconProps) => {
    return (
        <TouchableNativeFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
            className={'justify-center items-center'}
            style={{padding: padding}}>
            <Icon name={iconName} size={iconSize} color={color} />
        </TouchableNativeFeedback>
    );
};

export default TouchableIcon;
