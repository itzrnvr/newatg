import {View, Text, Image} from 'react-native';
import React from 'react';
import TouchableIcon from '../../../components/TouchableIcon';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();

    return (
        <View
            className={
                'px-4 pt-3 mt-2 mx-1 flex-row items-center w-full relative'
            }>
            <Text
                className={'text-slate-600 mt-5 text-3xl w-[220px]'}
                style={{fontFamily: 'RobotoSlab-Regular'}}>
                Welcome to Awaken The Genius!
            </Text>

            <View className={'right-4 absolute'}>
                <Image
                    className={'h-[55px] w-[100px]'}
                    resizeMode={'contain'}
                    source={require('../../../assets/logo_img.png')}
                />
            </View>
        </View>
    );
};

export default Header;
