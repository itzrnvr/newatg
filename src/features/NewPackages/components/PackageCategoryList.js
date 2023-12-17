import {FlatList, Text} from 'react-native';
import {useEffect, useState} from 'react';
import PackageItem from './PackageItem';

export default function MyComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Create an array with 200 elements, where each element is its index.
        const types = ['active', 'expired', 'available'];

        const array = Array.from({length: 50}, () => {
            return {
                type: types[Math.floor(Math.random() * types.length)],
            };
        });

        setData(array);

        console.log(array);
    }, []);

    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => String(index)} // Key extractor required for optimal rendering.
            renderItem={({item}) => <PackageItem item={item} />}
        />
    );
}
