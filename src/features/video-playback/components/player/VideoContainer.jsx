import React, {
    useState,
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from 'react';
import {View, StyleSheet, UIManager, findNodeHandle} from 'react-native';
// import {SecurePlayer} from 'utils/native';
import * as ReactNative from 'react-native';
export const VideoContainer = forwardRef((props, ref) => {
    const playerRef = useRef(null);
    const [playbackUrl, setPlaybackUrl] = useState(null);

    const handlePlay = () => {
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(playerRef.current),
            UIManager.getViewManagerConfig('SecurePlayerManager').Commands.play,
            null,
        );
    };

    const handlePause = () => {
        console.log('PAUSED2');
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(playerRef.current),
            UIManager.getViewManagerConfig('SecurePlayerManager').Commands
                .pause,
            null,
        );
    };

    useImperativeHandle(ref, () => ({
        play: handlePlay,
        pause: handlePause,
    }));

    return (
        <View style={styles.container}>
            {/*<SecurePlayer*/}
            {/*    ref={playerRef}*/}
            {/*    style={{flex: 1}}*/}
            {/*    source={{*/}
            {/*        source: 'https://junglebookpune.org/test_awaken_genius/videos/speed_reading/master.m3u8',*/}
            {/*        videoID: 'speed_reading',*/}
            {/*        serialKey: '',*/}
            {/*    }}*/}
            {/*/>*/}
        </View>
    );
});

export default VideoContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
