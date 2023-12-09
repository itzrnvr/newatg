import {View, Text, FlatList, Image} from 'react-native';
import tailwindColorMap from 'utils/tailwindColors';
import Icon from 'react-native-remix-icon';
import React from 'react';

const data = [
    {
        title: 'Study Skills',
        thumbnailUrl:
            'https://firebasestorage.googleapis.com/v0/b/stream-46b9f.appspot.com/o/assets%2Fpackages_horizontal_list%2FGroup%2018.png?alt=media&token=3037de6b-346a-4d99-8e43-4b5f5891e2b1',
    },
    {
        title: 'Speed Reading',
        thumbnailUrl:
            'https://firebasestorage.googleapis.com/v0/b/stream-46b9f.appspot.com/o/assets%2Fpackages_horizontal_list%2FGroup%2019%20(1).png?alt=media&token=06305f0d-3b78-4c9c-bd31-a8078885ac23',
    },
];

const ListHorizontalPackages = () => {
    const renderItem = ({item}) => (
        <View
            className={
                'ml-4 w-[175px] h-[220px] bg-white rounded-2xl border p-[2px] mb-8'
            }>
            <View>
                <Image
                    style={{resizeMode: 'cover'}}
                    className={'h-[115] w-full rounded-[12px] border'}
                    source={{
                        uri: item.thumbnailUrl,
                    }}
                />
            </View>

            <Text
                className={'text-black w-full text-center mt-3'}
                style={{fontFamily: 'RobotoSlab-Light', fontSize: 17}}>
                {item.title}
            </Text>

            <View className={'border mx-4 py-3 rounded-lg mt-3'}>
                <Text
                    className={'text-slate-600 text-center'}
                    style={{fontFamily: 'Lato-Regular', fontSize: 14}}>
                    Buy Now
                </Text>
            </View>
        </View>
    );

    return (
        <View
            className={'pt-2'}
            style={{backgroundColor: tailwindColorMap.purple['50']}}>
            <View className={'my-4 flex-row items-center-center'}>
                <Text
                    className={'text-slate-600 text-lg ml-6'}
                    style={{fontFamily: 'Roboto-Regular'}}>
                    Explore Packages
                </Text>
                <View className={'absolute right-6'}>
                    <Icon
                        name={'ri-arrow-right-line'}
                        size={30}
                        color={tailwindColorMap.slate['500']}
                    />
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false} // to hide horizontal scroll indicators
            />
        </View>
    );
};

export default ListHorizontalPackages;
