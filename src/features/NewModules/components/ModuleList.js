import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ModuleItem from './ModuleItem';
import {Fonts} from 'utils/Constants';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

export default function ModuleList({data, ...rest}) {
    const category = data.category;

    const copyToClipboard = textToCopy => {
        Clipboard.setString(textToCopy);
    };

    return (
        <View>
            <Text
                className={'text-slate-700 text-lg ml-4 mt-5'}
                style={{fontFamily: Fonts.Lato.Bold}}>
                {data.category}
            </Text>
            <FlatList
                {...rest}
                data={data.items}
                keyExtractor={(item, index) => String(index)} // Key extractor required for optimal rendering.
                renderItem={({item}) => <ModuleItem item={{type: category}} />}
            />
            <TouchableNativeFeedback
                onPress={() => copyToClipboard('9999999999')}
                className={'justify-center items-center mt-8'}>
                <Text className={'text-gray-400 text-sm font-light'}>
                    Serial Key: 9999999999
                </Text>
                <Text className={'text-gray-300 text-xs font-light'}>
                    (Tap To Copy)
                </Text>
            </TouchableNativeFeedback>
        </View>
    );
}
