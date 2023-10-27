import {FlatList, Text, View} from 'react-native';
import Dialog from 'react-native-dialog';
import {BitrateAndResolution} from '../../services/fetchVideoBitrateAndResolutions';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

interface QualitySelectionDialogPropTypes {
    data: BitrateAndResolution[] | undefined;
    visible: boolean;
    onSelect: (item: BitrateAndResolution) => void;
}
const QualitySelectionDialog = ({
    data,
    visible,
    onSelect,
}: QualitySelectionDialogPropTypes) => {
    return (
        <View>
            <Dialog.Container visible={visible} contentStyle={{backgroundColor: '#ffffff'}}>
                <Dialog.Title className={'text-black'}>Select Resolution</Dialog.Title>
                <View className={'mt-4'}>
                    <QualityFlatlist data={data} onSelect={onSelect} />
                </View>
            </Dialog.Container>
        </View>
    );
};

const QualityRenderItem = ({
    item,
    onSelect,
}: {
    item: BitrateAndResolution;
    onSelect: (item: BitrateAndResolution) => void;
}) => (
    <TouchableNativeFeedback className={'px-2 py-3.5'} onPress={() => onSelect(item)}>
        <Text className={'text-black'}>{item.resolution}</Text>
    </TouchableNativeFeedback>
);
const QualityFlatlist = ({
    data,
    onSelect,
}: {
    data: BitrateAndResolution[] | undefined;
    onSelect: (item: BitrateAndResolution) => void;
}) => {
    return (
        <FlatList
            data={data}
            renderItem={({item}) => (
                <QualityRenderItem item={item} onSelect={(item) => onSelect(item)} />
            )}
        />
    );
};

export default QualitySelectionDialog;
