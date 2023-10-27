import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import TouchableIcon from '../TouchableIcon';
import React, {useEffect, useRef, useState} from 'react';
import Slider from '@react-native-community/slider';

let timeoutId: NodeJS.Timeout | null = null;
const SecurePlayerControls = () => {
    let press = useRef(false);

    const [isVideoSettingsSheetOpen, setIsVideoSettingsSheetOpen] =
        useState(false);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [controlsVisible, setControlsVisible] = useState(true);

    const restartTimer = () => {
        if (timeoutId) clearTimeout(timeoutId);

        console.log('called');
        timeoutId = setTimeout(() => setControlsVisible(false), 5000);
    };

    const handleContainerPress = () => {
        setControlsVisible(!controlsVisible);
    };

    const handlePlayPause = () => {
        console.log('handlePlayPause');
        setPlaying(!playing);
        restartTimer();
    };
    const handleProgressChange = (value: number) => {
        setProgress(value);
        console.log(value);
        restartTimer();
    };

    useEffect(() => {
        console.log(playing);
    }, [playing]);

    useEffect(() => {
        console.log('Container Pressed', `controlsVisible ${controlsVisible}`);
        if (controlsVisible) {
            restartTimer();
        }
    }, [controlsVisible]);

    return (
        <TouchableWithoutFeedback
            onPress={() => !press.current && handleContainerPress()}>
            <View style={styles.container}>
                {controlsVisible && (
                    <View style={styles.controls}>
                        <View style={styles.topControls}>
                            <TouchableIcon
                                iconName={'arrow-left-line'}
                                iconSize={30}
                                onPress={() => console.log('back')}
                                onPressIn={() => (press.current = true)}
                                onPressOut={() => (press.current = false)}
                                color={'#ffffff'}
                            />
                            <Text style={styles.title}>Speed Reading</Text>
                        </View>

                        <View style={styles.centerControls}>
                            <TouchableIcon
                                iconName={playing ? `pause-line` : `play-fill`}
                                iconSize={30}
                                onPress={handlePlayPause}
                                onPressIn={() => (press.current = true)}
                                onPressOut={() => (press.current = false)}
                                color={'#ffffff'}
                            />
                        </View>

                        <View style={styles.bottomControls}>
                            <Text style={styles.videoTime}>{'0:00/5:00'}</Text>
                            <Slider
                                style={styles.slider}
                                value={progress}
                                onValueChange={handleProgressChange}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#f00"
                                maximumTrackTintColor="#f00"
                                thumbTintColor="#f00"
                            />
                            <TouchableIcon
                                iconName={'settings-3-line'}
                                iconSize={30}
                                onPress={() => console.log('settings')}
                                onPressIn={() => (press.current = true)}
                                onPressOut={() => (press.current = false)}
                                color={'#ffffff'}
                            />
                        </View>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SecurePlayerControls;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        flex: 1,
        paddingTop: 16,
        paddingBottom: 16,
        paddingStart: 24,
        paddingEnd: 24,
        backgroundColor: 'rgba(0,0,0,0.30)',
    },
    slider: {
        height: 40,
        flex: 1,
    },
    videoTime: {
        color: 'white',
    },
    topControls: {
        height: 56,
        color: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        paddingStart: 16,
        color: '#fff',
        fontSize: 18,
    },
    centerControls: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomControls: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
