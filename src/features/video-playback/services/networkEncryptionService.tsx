import axios, {AxiosResponse} from 'axios';
import CryptoJS from 'react-native-crypto-js';
import {NativeModules} from 'react-native';

const {RsaManager} = NativeModules;

// Assume privateKey and encryptedData are defined
// RsaManager.decryptData(privateKey, encryptedData)
//     .then((data: { decryptedData: any; }) => console.log(data.decryptedData)) // logs decrypted data
//     .catch((error: any) => console.error(error));

// Define your secret key
const secretKey: string = 'secretKey';

// Function to encrypt the data
function encryptWithAES(text: string): string {
    const encryptedData = CryptoJS.AES.encrypt(text, secretKey).toString();
    console.log(encryptedData);
    return encryptedData;
}

// Function to decrypt the data
function decryptWithAES(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

export const makeSecureRequest = async () => {
    // const public_key =
    //     'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmHzD76i8DA25nC+QsswiOM0lW+gViiQD4tEm7suxBc2BGibtdlrsprVIId92hSjQKx4x8+XVWU6k89T5vy8YtxpXN759OWdGkDi8uvZuYclMjW9Rao+oqSvbXH37R7oSY287I+6uOHclGhniQN3qRyoXBkbhDk0/FTI/i549q/gGk1UZYv449KLrDOqmtohRcIyAYVnvvWtD1kIzourqhMtEIrPqwoBqTaUA9kOIXw1jMovao2TN52j48KgOg9KjqtdwUwD9e6n7hJd/subF6woc8L7zjJFOHH5gacUC7vtiMpBpnSyLQpjFLepYYwftjsRmg4xLdh+Zvgw3xqi4lwIDAQAB';

    const keyPair = await RsaManager.generateKeyPair();
    const public_key = keyPair.publicKey;
    const privateKey = keyPair.privateKey;

    console.log('pub', public_key);
    const video_id = 'speed_reading';

    const payload = {
        public_key,
        video_id,
    };

    const encryptedData: string = encryptWithAES(JSON.stringify(payload));

    const CloudflareWorkerUrl: string =
        'https://atg-service-encryption.saiyaman.workers.dev';

    axios
        .post(CloudflareWorkerUrl, encryptedData)
        .then(async (response: AxiosResponse) => {
            // Decrypting received data

            const encryptedData = response.data;

            console.log('encryptedData', encryptedData);

            const decryptedData: string = decryptWithAES(encryptedData);

            console.log('decrypted: ', decryptedData); // logging the decrypted data

            const authKey = JSON.parse(decryptedData).auth_key;

            const keyResponse = await RsaManager.decryptData(
                privateKey,
                authKey,
            );

            console.log(keyResponse.decryptedData);
        })
        .catch(error => {
            console.error(error); // logging error if any
        });
};