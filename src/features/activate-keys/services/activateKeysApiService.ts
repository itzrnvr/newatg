import {getSerailKeyStatus} from 'utils/Constants';
import axios from 'axios';

export interface APIResponseKeyStatus {
    success: (callback: () => void) => APIResponseKeyStatus;
    error: (callback: (error: any) => void) => APIResponseKeyStatus;
}

export const fetchKeyStatus = (
    serialKey: string,
    macId: string,
): APIResponseKeyStatus => {
    let successCallback: () => void = () => {};
    let errorCallback: (error: any) => void = () => {};

    const result: APIResponseKeyStatus = {
        error(callback: (error: any) => void): APIResponseKeyStatus {
            errorCallback = callback;
            return result;
        },
        success(callback: () => void): APIResponseKeyStatus {
            successCallback = callback;
            return result;
        },
    };

    axios({
        method: 'post',
        url: getSerailKeyStatus,
        params: {
            serial_key: serialKey,
            mac_id: macId,
        },
    })
        .then(response => {
            if (
                response.data.response !== 400 &&
                response.data.response === 200
            ) {
                console.log(response.data);
                successCallback();
            } else {
                console.log('Error');
                throw new Error(`HTTP error! status: ${response.data.status}`);
            }
        })
        .catch((error: any) => {
            errorCallback(error);
        });

    return result;
};
