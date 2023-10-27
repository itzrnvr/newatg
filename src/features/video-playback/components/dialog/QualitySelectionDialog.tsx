import {
    Button,
    Dimensions,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {BitrateAndResolution} from '../../services/fetchVideoBitrateAndResolutions';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Portal, Dialog, Provider, PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';

interface QualitySelectionDialogPropTypes {
    data: BitrateAndResolution[] | undefined;
    visible: boolean;
    hideVisible: () => void;
    onSelect: (item: BitrateAndResolution) => void;
}
const QualitySelectionDialog = ({
    data,
    visible,
    hideVisible,
    onSelect,
}: QualitySelectionDialogPropTypes) => {
    let width = Dimensions.get('window').width * 0.6; // for 60% of the screen width

    return (
        <View>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={hideVisible}
                    style={{alignSelf: 'center', width: width}}>
                    <Text className={'pl-8 pb-4 text-sm font-bold'}>
                        Select Resolution
                    </Text>
                    <Dialog.ScrollArea style={{width: width}}>
                        <View>
                            <Dialog.Content>
                                <QualityFlatlist
                                    data={data}
                                    onSelect={item => {
                                        onSelect(item);
                                        hideVisible();
                                    }}
                                />
                            </Dialog.Content>
                        </View>
                    </Dialog.ScrollArea>
                </Dialog>
            </Portal>
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
    <TouchableNativeFeedback
        className={'items-center rounded-2xl'}
        onPress={() => onSelect(item)}>
        <Text className={'py-4 px-2 '}>{item.height + 'p'}</Text>
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
                <QualityRenderItem
                    item={item}
                    onSelect={item => onSelect(item)}
                />
            )}
        />
    );
};

export default QualitySelectionDialog;
