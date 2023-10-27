import {View} from 'react-native';
import {StackParamList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SecurePlayer from '../../features/video-playback/components/player/SecurePlayer';
import {useEffect, useState} from 'react';
import Orientation from 'react-native-orientation';
import fetchVideoBitrateAndResolutions, {
    BitrateAndResolution,
} from '../../features/video-playback/services/fetchVideoBitrateAndResolutions';
import QualitySelectionDialog from '../../features/video-playback/components/dialog/QualitySelectionDialog';

const VideoPlayback = ({
    route,
}: NativeStackScreenProps<StackParamList, 'VideoPlayback'>) => {
    const {videoDetails} = route.params;
    const [tracks, setTracks] = useState<BitrateAndResolution[]>();
    const [dialogVisible, setDialogVisible] = useState(false);

    //const url = 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8';
    const url =
        'https://junglebookpune.org/test_awaken_genius/videos/speed_reading/master.m3u8';
    const getVideoResolutions = () => {
        fetchVideoBitrateAndResolutions(url)
            .then(bitratesAndResolutions => {
                console.log(
                    'Bitrates and Resolutions:',
                    bitratesAndResolutions,
                );
                setTracks(bitratesAndResolutions);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        Orientation.lockToLandscape();
        getVideoResolutions();
        return () => {
            Orientation.lockToPortrait();
        };
    }, []);

    //'https://junglebookpune.org/test_awaken_genius/videos/speed_reading/master.m3u8'

    return (
        <View className={'h-full'}>
            <View className={'h-full>'}>
                <SecurePlayer
                    src={url}
                    onPressSettings={() => setDialogVisible(true)}
                />
            </View>
            <QualitySelectionDialog
                data={tracks}
                visible={dialogVisible}
                onSelect={item => console.log(item)}
            />
        </View>
    );
};

export default VideoPlayback;
