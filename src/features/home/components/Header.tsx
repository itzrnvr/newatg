import {Text, View} from 'react-native';
import Icon from 'react-native-remix-icon';
import React from 'react';

const HeaderHome = () => {
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

            <Icon
                className={'right-4 absolute'}
                name="account-circle-line"
                size="40"
                color="black"
            />
        </View>
    );
};

export default HeaderHome;
