import React from 'react';
import Video from 'react-native-video';

type SecurePlayerProps = {
    src: string;
};

const SecurePlayer: React.FC<SecurePlayerProps> = ({src}) => {
    return (
        <Video
            source={{uri: src}} // The video source. In this case, an HLS stream link.
            style={{width: '100%', height: 300}}
            resizeMode="cover"
            controls={true} // Show controls for the video player
        />
    );
};

export default SecurePlayer;
