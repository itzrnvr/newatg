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
                src={'https://content.jwplatform.com/manifests/yp34SRmf.m3u8'}
            />
        </View>
    );
};

export default VideoPlayback;
