import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';

const HomeComponentList = () => {
    const [data, setData] = useState([
        {id: 'data1', type: 'type1'},
        {id: 'data2', type: 'type2'},
        {id: 'data3', type: 'type1'},
        //...any other data
    ]);

    const renderItem = ({item}) => {
        if (item.type === 'type1') {
            return (
                <View>
                    <Text>This is type1 View</Text>
                </View>
            );
        } else if (item.type === 'type2') {
            return (
                <View>
                    <Text>This is type2 View</Text>
                </View>
            );
        }
    };

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    );
};

export default HomeComponentList;
