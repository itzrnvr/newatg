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
import {PaperProvider} from 'react-native-paper';
import {fetchMainVideos} from '../../features/my-packages/services/myPackagesApiService';
import {makeSecureRequest} from '../../features/video-playback/services/networkEncryptionService';
import {useDrmStore} from '../../features/video-playback/store';

const VideoPlayback = ({
    route,
}: NativeStackScreenProps<StackParamList, 'VideoPlayback'>) => {
    const {videoDetails} = route.params;
    const {setKeys} = useDrmStore();
    const [tracks, setTracks] = useState<BitrateAndResolution[]>();
    const [selectedTrack, setSelectedTrack] =
        useState<BitrateAndResolution | null>(null);
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

    const fetchEncryptedKey = async () => {
        setKeys('', '');
        const {authKey, privateKey} = await makeSecureRequest();
        setKeys(authKey, privateKey);
        console.log('keysSet');
    };

    useEffect(() => {
        Orientation.lockToLandscape();
        getVideoResolutions();
        fetchEncryptedKey();
        return () => {
            Orientation.lockToPortrait();
        };
    }, []);

    //'https://junglebookpune.org/test_awaken_genius/videos/speed_reading/master.m3u8'

    return (
        <PaperProvider>
            <View className={'h-full>'}>
                <SecurePlayer
                    src={url}
                    currentTrack={selectedTrack}
                    onPressSettings={() => setDialogVisible(true)}
                />
            </View>
            <QualitySelectionDialog
                data={tracks}
                visible={dialogVisible}
                hideVisible={() => setDialogVisible(false)}
                onSelect={item => setSelectedTrack(item)}
            />
        </PaperProvider>
    );
};

export default VideoPlayback;
