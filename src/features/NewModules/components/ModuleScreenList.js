import React from 'react';
import {FlatList, View, Animated} from 'react-native';

export default function ModuleScreenList({data, scrollY, onScroll}) {
    const renderSection = ({item}) => {
        const SectionComponent = item.Component;
        if (!SectionComponent) return null;

        return (
            <View>
                <SectionComponent data={item.data} scrollY={scrollY} />
            </View>
        );
    };

    return (
        <Animated.FlatList
            keyExtractor={(item, index) => item.type + index} // Ensuring key uniqueness
            data={data}
            renderItem={renderSection}
            onScroll={onScroll}
        />
    );
}
