import React from 'react';
import {FlatList, View} from 'react-native';

const HomeScreenList = ({data}) => {
    const renderSection = ({item}) => {
        const SectionComponent = item.Component;
        if (!SectionComponent) return null;

        return (
            <View>
                <SectionComponent data={item.data} />
            </View>
        );
    };

    return (
        <FlatList
            keyExtractor={(item, index) => item.type + index} // Ensuring key uniqueness
            data={data}
            renderItem={renderSection}
            // Removed styles for clarity, as there were no styles in `StyleSheet`
        />
    );
};

export default HomeScreenList;
