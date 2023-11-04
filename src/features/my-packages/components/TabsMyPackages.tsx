import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PackagesScreen from './tabs/Packages';
import DownloadsScreen from './tabs/Downloads';
import {Serial} from '../services/seriaKeyListStatusApiService';

const Tabs = createMaterialTopTabNavigator();

function TabsMyPackages({serial}: {serial: Serial}) {
    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="Packages"
                component={PackagesScreen}
                initialParams={{key: serial}}
            />
            <Tabs.Screen name="Downloads" component={DownloadsScreen} />
        </Tabs.Navigator>
    );
}

export default TabsMyPackages;
