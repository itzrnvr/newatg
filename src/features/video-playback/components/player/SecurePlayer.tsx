import React from 'react';
import Video from 'react-native-video';
import {View} from "react-native";
import SecurePlayerControls from "./SecurePlayerControls";

type SecurePlayerProps = {
    src: string;
};

const SecurePlayer: React.FC<SecurePlayerProps> = ({src}) => {
    return (
        <View className={'relative'}>
            <Video
                source={{uri: src}} // The video source. In this case, an HLS stream link.
                className={'h-full w-full'}
                resizeMode="contain"
            />
            <View className={'absolute bg-red-700 opacity-70 top-0 left-0 right-0 bottom-0'}>
                <SecurePlayerControls />
            </View>
        </View>
    );
};

export default SecurePlayer;
