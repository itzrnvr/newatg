import {Text, View} from 'react-native';
import {StackParamList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const VideoPlayback = ({
    route,
}: NativeStackScreenProps<StackParamList, 'VideoPlayback'>) => {
    const {videoDetails} = route.params;

    return (
        <View className={'h-full'}>
            <Text className={'text-black'}>{videoDetails.title}</Text>
            <Text className={'text-black'}>{videoDetails.link}</Text>
        </View>
    );
};

export default VideoPlayback;
