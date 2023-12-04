import {View, Text} from 'react-native';
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
                className={'text-slate-800 mt-5 text-3xl w-[220px]'}
                style={{fontFamily: 'RobotoSlab-Regular'}}>
                Welcome to Awaken The Genius!
            </Text>

            <View className={'right-4 absolute'}>
                <TouchableIcon
                    iconName="account-circle-line"
                    iconSize={40}
                    color="black"
                    padding={0}
                    onPress={() => navigation.navigate('Profile')}
                />
            </View>
        </View>
    );
};

export default Header;
