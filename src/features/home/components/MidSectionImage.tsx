import {Image, Text, View} from 'react-native';

const MidSectionImage = () => {
    return (
        <View className={'mt-4 px-2 h-[120] w-full'}>
            <Image
                className={'h-124 w-full'}
                resizeMode={'cover'}
                source={require('../../../assets/MidSectionImage.png')}
            />
        </View>
    );
};

export default MidSectionImage;
