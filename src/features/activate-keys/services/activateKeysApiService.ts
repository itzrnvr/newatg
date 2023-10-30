import {getSerailKeyStatus} from 'utils/Constants';
import axios from 'axios';
import {APIResponse} from '../../my-packages/services/myPackagesApiService';

// export interface APIResponseKeyStatus {
//     success: (callback: () => void) => APIResponseKeyStatus;
//     error: (callback: (error: any) => void) => APIResponseKeyStatus;
// }

export const fetchKeyStatus = (
    serialKey: string,
    macId: string,
): APIResponse<any> => {
    let successCallback: (data: null) => void = () => {};
    let errorCallback: (error: any) => void = () => {};

    const result: APIResponse<any> = {
        error(callback: (error: any) => void): APIResponse<any> {
            errorCallback = callback;
            return result;
        },
        success(callback: (data: null) => void): APIResponse<any> {
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
                successCallback(null);
            } else {
                console.log('Error');
                console.log(response.data);
                console.log(response.data.response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .catch((error: any) => {
            errorCallback(error);
        });

    return result;
};
