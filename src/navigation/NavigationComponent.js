import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Index from '../screens/NewHome';
import Icon from 'react-native-remix-icon';
import tailwindColorMap from 'utils/tailwindColors';
import NewPackages from '../screens/NewPackages';
import NewHome from '../screens/NewHome';
import NewActivateKeys from '../screens/NewActivateKeys';

const Tab = createBottomTabNavigator();

export default function NavigationComponent() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#3e2465',
                tabBarStyle: {
                    borderBottomWidth: 1,
                    backgroundColor: 'orange',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomEndRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderColor: 'red',
                    overflow: 'hidden',
                    margin: 20,
                },
            }}>
            <Tab.Screen
                name="NewHome"
                component={NewHome}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <Icon
                            name={'ri-home-4-line'}
                            size={size}
                            color={color}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Packages"
                component={NewPackages}
                options={{
                    tabBarLabel: 'Packages',
                    tabBarIcon: ({color, size}) => (
                        <Icon
                            name={'ri-video-line'}
                            size={size}
                            color={color}
                        />
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="NewActivateKeys"
                component={NewActivateKeys}
                options={{
                    tabBarLabel: 'Activate Keys',
                    tabBarIcon: ({color, size}) => (
                        <Icon
                            name={'ri-key-2-line'}
                            size={size}
                            color={color}
                        />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}
