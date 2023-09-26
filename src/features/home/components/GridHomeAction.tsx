import {FlatList, Text, TouchableNativeFeedback, View} from 'react-native';

const data: GridHomeActionItem[] = [
    {key: 'A'},
    {key: 'B'},
    {key: 'C'},
    {key: 'D'},
    {key: 'E'},
    // Add more items here
];

const numColumns = 2;

interface GridHomeActionItem {
    key: string;
}

interface RenderItemProps {
    item: GridHomeActionItem;
}

const renderItem = ({item}: RenderItemProps) => (
    <TouchableNativeFeedback>
        <View
            className={
                'rounded-[12px] bg-[#B79FFE] items-center justify-center flex-1 h-[150px] m-1'
            }>
            <Text>{item.key}</Text>
        </View>
    </TouchableNativeFeedback>
);

export interface GridHomeActionProps {}

const GridHomeAction = () => {
    return (
        <View className={'mt-5'}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                numColumns={numColumns}
            />
        </View>
    );
};

export default GridHomeAction;
