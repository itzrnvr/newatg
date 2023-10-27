import React, {useEffect, useRef, useState} from 'react';
import Video, {
    LoadError,
    OnBufferData,
    OnLoadData,
    OnProgressData,
} from 'react-native-video';
import {View} from 'react-native';
import SecurePlayerControls from './SecurePlayerControls';
import {BitrateAndResolution} from '../../services/fetchVideoBitrateAndResolutions';

type SecurePlayerProps = {
    src: string;
    currentTrack: BitrateAndResolution | null;
    onPressSettings: () => void;
};

const SecurePlayer: React.FC<SecurePlayerProps> = ({
    src,
    currentTrack,
    onPressSettings,
}) => {
    const [paused, setPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffering, setBuffering] = useState(false);
    const handleVideoProgress = (progressData: OnProgressData) => {
        setCurrentTime(progressData.currentTime);
    };

    const handleVideoLoaded = (loadedData: OnLoadData) => {
        setDuration(loadedData.duration);
    };

    const handleBuffer = (buffer: OnBufferData) => {
        console.log('Buffering: ' + buffer.isBuffering);
        setBuffering(buffer.isBuffering);
    };

    const handleSliding = (value: number) => {
        videoPlayerRef.current?.seek(value);
    };

    const videoPlayerRef: React.MutableRefObject<Video | null> = useRef(null);

    useEffect(() => {
        console.log(
            'Selected track ',
            currentTrack?.height + ' ' + currentTrack?.bitrate,
        );
    }, [currentTrack]);

    // Optional parameters object
    const videoProps: Record<string, any> = {};

    // Add selectedVideoTrack only when currentTrack?.height is not null
    if (currentTrack?.height) {
        videoProps.selectedVideoTrack = {
            type: 'resolution',
            value: currentTrack.height,
        };
    }

    return (
        <View className={'relative bg-black'}>
            <Video
                {...videoProps}
                ref={videoPlayerRef}
                source={{uri: src}}
                className={'h-full w-full'}
                resizeMode="contain"
                paused={paused}
                onProgress={handleVideoProgress}
                onLoad={handleVideoLoaded}
                onBuffer={handleBuffer}
                onLoadStart={() => {
                    console.log('onLoadStart');
                    setBuffering(true);
                }}
                onVideoLoadStart={() => {
                    console.log('onVideoStart');
                    setBuffering(true);
                }}
                onVideoEnd={() => {
                    console.log('onVideoEnd');
                }}
                onError={(error: LoadError) => {
                    console.log(error);
                }}
            />

            <View className={'absolute top-0 left-0 right-0 bottom-0'}>
                <SecurePlayerControls
                    onPlay={() => setPaused(false)}
                    onPause={() => setPaused(true)}
                    onChangeProgress={handleSliding}
                    currentTime={currentTime}
                    duration={duration}
                    onPressSettings={onPressSettings}
                    buffering={buffering}
                />
            </View>
        </View>
    );
};

export default SecurePlayer;
