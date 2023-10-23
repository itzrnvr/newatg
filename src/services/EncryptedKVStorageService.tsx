import EncryptedStorage from 'react-native-encrypted-storage';
import {Alert} from 'react-native';

export async function setValue(storageKey: string, value: string) {
    try {
        EncryptedStorage.setItem(storageKey, value);
    } catch (error) {
    } finally {
    }
}

export async function getValue(storageKey: string) {
    try {
        const savedNumber = EncryptedStorage.getItem(storageKey);
        console.log(savedNumber);

        if (savedNumber) {
            return savedNumber;
        } else {
            return '';
        }
    } catch (error) {
    } finally {
    }
}

async function removeValue(STORAGE_KEY: string, done: () => void) {
    try {
        await EncryptedStorage.removeItem(STORAGE_KEY);
        Alert.alert(
            `The value with key ${STORAGE_KEY} was succesfully deleted`,
        );
    } catch (error) {
        Alert.alert(
            `The value with key ${STORAGE_KEY} could not be deleted - ${error}`,
        );
    } finally {
        done();
    }
}

async function clearValues(done: () => void) {
    try {
        await EncryptedStorage.clear();
        Alert.alert('The storage has been successfully cleared');
    } catch (error) {
        Alert.alert(`The storage could not be cleared - ${error}`);
    } finally {
        done();
    }
}
