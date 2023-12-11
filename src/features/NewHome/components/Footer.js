import {Text, View, Image, Touchable} from 'react-native';
import Icon from 'react-native-remix-icon';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {faqs} from 'utils/Constants';
import {StackParamList} from '../../../../App';
import tailwindColorMap from 'utils/tailwindColors';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const Footer = () => {
    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback
            className={'h-56 flex justify-center items-center'}
            onPress={() =>
                navigation.navigate('WebScreen', {
                    uri: 'https://awakenthegenius.org/awakenpanel/',
                })
            }>
            <View>
                <Image
                    className={'h-[60px] w-[200px] mr-12 mt-4'}
                    resizeMode={'cover'}
                    source={require('../../../assets/logo_text.png')}
                />
            </View>

            <View className={'flex-row'}>
                <Text
                    className={'text-slate-800 text-blue-500 underline mr-2'}
                    style={{fontFamily: 'RobotoSlab-Light'}}>
                    Get In Touch, Explore Our Website
                </Text>
                <Icon
                    name={'ri-external-link-line'}
                    size={24} // You can adjust the size based on your design needs
                    color={tailwindColorMap.blue['500']}
                />
            </View>
        </TouchableNativeFeedback>
    );
};

export default Footer;
