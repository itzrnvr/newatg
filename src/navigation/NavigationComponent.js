import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Index from '../screens/NewHome';
import Icon from 'react-native-remix-icon';
import tailwindColorMap from 'utils/tailwindColors';
import NewPackages from '../screens/NewPackages';
import NewHome from '../screens/NewHome';
import NewActivateKeys from '../screens/NewActivateKeys';
import {Text, Touchable, TouchableOpacity, View} from 'react-native';
import NewProfile from '../screens/NewProfile';
import {TouchableRipple} from 'react-native-paper';
import {hexToRGBA} from 'utils/misc';

const Tab = createBottomTabNavigator();

export default function NavigationComponent() {
    const createTabBarLabel = labelText => {
        return ({focused, color}) => {
            return null;
        };
    };

    const createTabBarIcon = (iconName, onFocusIcon) => {
        return ({focused, color, size}) => (
            <Icon
                name={focused ? onFocusIcon : iconName}
                size={focused ? 36 : 30} // You can adjust the size based on your design needs
                color={focused ? color : tailwindColorMap.slate['500']}
            />
        );
    };

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: tailwindColorMap.blue['500'],
                tabBarInactiveTintColor: tailwindColorMap.black,
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 64,
                },
                tabBarButton: props => (
                    <TouchableRipple
                        className={'rounded-2xl'}
                        rippleColor={hexToRGBA(tailwindColorMap.blue[300], 0.3)}
                        {...props}
                    />
                ),
            }}>
            <Tab.Screen
                name="NewHome"
                component={NewHome}
                options={{
                    tabBarLabel: createTabBarLabel('Home'),
                    tabBarIcon: createTabBarIcon(
                        'ri-home-4-line',
                        'ri-home-4-fill',
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Packages"
                component={NewPackages}
                options={{
                    tabBarLabel: createTabBarLabel('Packages'),
                    tabBarIcon: createTabBarIcon(
                        'ri-play-circle-line',
                        'ri-play-circle-fill',
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="NewActivateKeys"
                component={NewActivateKeys}
                options={{
                    tabBarLabel: createTabBarLabel('Keys'),
                    tabBarIcon: createTabBarIcon(
                        'ri-key-2-line',
                        'ri-key-2-fill',
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="NewProfile"
                component={NewProfile}
                options={{
                    tabBarLabel: createTabBarLabel('Profile'),
                    tabBarIcon: createTabBarIcon(
                        'account-circle-line',
                        'account-circle-fill',
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}
