import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PackagesScreen from './tabs/Packages';
import DownloadsScreen from './tabs/Downloads';

const Tabs = createMaterialTopTabNavigator();

function TabsMyPackages() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Packages" component={PackagesScreen} />
            <Tabs.Screen name="Downloads" component={DownloadsScreen} />
        </Tabs.Navigator>
    );
}

export default TabsMyPackages;
