import {Text, View} from 'react-native';
import Icon from 'react-native-remix-icon';
import React from 'react';
import TouchableIcon from '../../video-playback/components/TouchableIcon';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {faqs} from 'utils/Constants';
import {StackParamList} from '../../../../App';

const HeaderHome = () => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();

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

export default HeaderHome;
