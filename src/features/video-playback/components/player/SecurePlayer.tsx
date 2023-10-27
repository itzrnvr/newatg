import React, {useRef, useState} from 'react';
import Video, {
    LoadError,
    OnBufferData,
    OnLoadData,
    OnProgressData,
} from 'react-native-video';
import {View} from 'react-native';
import SecurePlayerControls from './SecurePlayerControls';
import * as buffer from 'buffer';

type SecurePlayerProps = {
    src: string;
    onPressSettings: () => void;
};

const SecurePlayer: React.FC<SecurePlayerProps> = ({src, onPressSettings}) => {
    const [paused, setPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleVideoProgress = (progressData: OnProgressData) => {
        setCurrentTime(progressData.currentTime);
    };

    const handleVideoLoaded = (loadedData: OnLoadData) => {
        setDuration(loadedData.duration);
    };

    const handleBuffer = (buffer: OnBufferData) => {
        console.log(buffer.isBuffering);
    };

    const handleSliding = (value: number) => {
        videoPlayerRef.current?.seek(value);
    };

    const videoPlayerRef: React.MutableRefObject<Video | null> = useRef(null);

    // 740000  270 480
    // 4830000  1080 1920
    // 2420000  720 1280
    // 1050000  406 720
    // 520000  180 320

    return (
        <View className={'relative bg-black'}>
            <Video
                ref={videoPlayerRef}
                source={{uri: src}} // The video source. In this case, an HLS stream link.
                className={'h-full w-full'}
                resizeMode="contain"
                paused={paused}
                onProgress={handleVideoProgress}
                onLoad={handleVideoLoaded}
                onBuffer={handleBuffer}
                onLoadStart={() => {
                    console.log('onLoadStart');
                }}
                onVideoLoadStart={() => {
                    console.log('onVideoStart');
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
                />
            </View>
        </View>
    );
};

export default SecurePlayer;
