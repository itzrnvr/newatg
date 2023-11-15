import {Text, View} from 'react-native';
import Icon from 'react-native-remix-icon';

const Profile = () => {
    return (
        <View>
            <Text className={'text-black'}>Complete Your Profile</Text>
            <Icon name={'account-circle-line'}/>
        </View>
    );
};

export default Profile;
