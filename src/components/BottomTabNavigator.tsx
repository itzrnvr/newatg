import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Home} from '../screens/home/Home';
import ActivateKeys from '../screens/activate-keys/ActivateKeys';
import MyPackages from '../screens/myPackages/MyPackages';
import MyVideos from '../screens/myVideos/MyVideos';

const BottomTabNavigator = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen
                name="ActivateKeys"
                component={ActivateKeys}
                options={{
                    headerShown: true,
                    headerTitle: 'Activate Keys Title',
                }}
            />
            <Tab.Screen
                name="MyPackages"
                component={MyPackages}
                options={{title: 'My Actions'}}
            />
            <Tab.Screen
                name="MyVideos"
                component={MyVideos}
                options={{title: 'My Videos'}}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
