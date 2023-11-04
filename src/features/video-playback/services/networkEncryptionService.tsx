import CryptoJS from 'react-native-crypto-js';
import {NativeModules} from 'react-native';
import axios from 'axios';

const {RsaManager} = NativeModules;

// Assume privateKey and encryptedData are defined
// RsaManager.decryptData(privateKey, encryptedData)
//     .then((data: { decryptedData: any; }) => console.log(data.decryptedData)) // logs decrypted data
//     .catch((error: any) => console.error(error));

// Define your secret key

// Function to encrypt the data
async function encryptWithAES(text: string) {
    const secretKey: string = await RsaManager.getApiKey();
    const encryptedData = CryptoJS.AES.encrypt(text, secretKey).toString();
    console.log(encryptedData);
    return encryptedData;
}

// Function to decrypt the data
async function decryptWithAES(cipherText: string) {
    const secretKey: string = await RsaManager.getApiKey();
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

export const makeSecureRequest = async (video_id: string) => {
    // const public_key =
    //     'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmHzD76i8DA25nC+QsswiOM0lW+gViiQD4tEm7suxBc2BGibtdlrsprVIId92hSjQKx4x8+XVWU6k89T5vy8YtxpXN759OWdGkDi8uvZuYclMjW9Rao+oqSvbXH37R7oSY287I+6uOHclGhniQN3qRyoXBkbhDk0/FTI/i549q/gGk1UZYv449KLrDOqmtohRcIyAYVnvvWtD1kIzourqhMtEIrPqwoBqTaUA9kOIXw1jMovao2TN52j48KgOg9KjqtdwUwD9e6n7hJd/subF6woc8L7zjJFOHH5gacUC7vtiMpBpnSyLQpjFLepYYwftjsRmg4xLdh+Zvgw3xqi4lwIDAQAB';

    const keyPair = await RsaManager.generateKeyPair();
    const public_key = keyPair.publicKey;
    const privateKey = keyPair.privateKey;

    console.log('pub', public_key);
    // const video_id = 'speed_reading';

    const payload = {
        public_key,
        video_id,
    };

    const encryptedData: string = await encryptWithAES(JSON.stringify(payload));

    const CloudflareWorkerUrl: string =
        'https://atg-service-encryption.saiyaman.workers.dev';

    const response = await axios.post(CloudflareWorkerUrl, encryptedData);

    const encryptedResponseData = await response.data;

    console.log('encryptedData', encryptedResponseData);

    const decryptedData: string = await decryptWithAES(encryptedResponseData);

    console.log('decrypted: ', decryptedData); // logging the decrypted data

    const authKey = JSON.parse(decryptedData).auth_key;

    return {authKey, privateKey};
};
