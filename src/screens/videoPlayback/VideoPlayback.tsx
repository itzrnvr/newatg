import {View} from 'react-native';
import {StackParamList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SecurePlayer from '../../features/video-playback/components/player/SecurePlayer';
import {useEffect} from 'react';
import Orientation from 'react-native-orientation';

const VideoPlayback = ({
    route,
}: NativeStackScreenProps<StackParamList, 'VideoPlayback'>) => {
    const {videoDetails} = route.params;

    useEffect(() => {
        Orientation.lockToLandscape();
        return () => {
            Orientation.lockToPortrait();
        };
    }, []);

    return (
        <View className={'h-full'}>
            <View className={'h-full>'}>
                <SecurePlayer
                    src={
                        'https://content.jwplatform.com/manifests/yp34SRmf.m3u8'
                    }
                />
            </View>
        </View>
    );
};

export default VideoPlayback;
