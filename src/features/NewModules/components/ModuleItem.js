import {View, Text, Image} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import tailwindColorMap from 'utils/tailwindColors';
import Icon from 'react-native-remix-icon';
import {fontFamily} from 'nativewind/dist/postcss/to-react-native/properties/font-family';
import {Fonts} from 'utils/Constants';
import {useNavigation} from '@react-navigation/native';
import MaterialCard from '../../../components/MaterialCard';
import {Shadow} from 'react-native-shadow-2';

export default function ModuleItem({item}) {
    const navigation = useNavigation();

    return (
        <View className={`m-4 rounded-xl bg-white`}>
            <Shadow
                className={'w-full rounded-xl pt-2'}
                distance={5}
                startColor={'#00000010'} // Light shadow start with 10% opacity
                finalColor={'#00000001'} // and ends nearly invisible
                offset={[0, 5]} // Same vertical offset as Material Design specifies
                paintInside={false} // Paint shadow outside of the given child
            >
                <TouchableRipple
                    onPress={() => navigation.navigate('NewModules')}>
                    <View className={'flex-row my-3 mx-3 items-center rounded-xl'}>
                        <Image
                            style={{height: 65, width: 65}}
                            resizeMode={'cover'}
                            source={require('../../../assets/module_purple.png')}
                        />
                        <Text
                            className={'text-slate-800 ml-4'}
                            style={{
                                fontFamily: Fonts.Lato.SemiBold,
                                fontSize: 18,
                            }}>
                            Speed Reading
                        </Text>
                    </View>
                </TouchableRipple>
            </Shadow>
        </View>
    );
}
