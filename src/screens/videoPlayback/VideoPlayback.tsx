import {Text, View} from 'react-native';
import {StackParamList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SecurePlayer from '../../features/video-playback/components/SecurePlayer';

const VideoPlayback = ({
    route,
}: NativeStackScreenProps<StackParamList, 'VideoPlayback'>) => {
    const {videoDetails} = route.params;

    return (
        <View className={'h-full'}>
            <Text className={'text-black'}>{videoDetails.title}</Text>
            <Text className={'text-black'}>{videoDetails.link}</Text>
            <SecurePlayer
                src={
                    'https://junglebookpune.org/test_awaken_genius/videos/speed_reading/master.m3u8'
                }
            />
        </View>
    );
};

export default VideoPlayback;
