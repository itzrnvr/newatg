import {getUniqueId} from 'react-native-device-info';
import {getValue, setValue} from './EncryptedKVStorageService';

export async function generateNewMacID() {
    return await getUniqueId();
}

export async function getMacID() {
    let macID = await getValue('mac_id');
    if (!macID) {
        macID = await generateNewMacID();
        await setValue('mac_id', macID); // manage the promise with await
    }
    return macID;
}

export async function generateAndStoreNewMacID() {
    const macID = await generateNewMacID();
    await setValue('mac_id', macID); // manage the promise with await
    return macID;
}
