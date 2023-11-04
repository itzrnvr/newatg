import axios from 'axios/index';
import {getSerialKeyList} from 'utils/Constants';
import {APIResponse} from './myPackagesApiService';

export type Serial = {
    pkey: string;
    serial_key: string;
    package_fk: string;
    duration: string;
    title: string;
    program_fk: string;
    activate_date: string;
    expiry_date: string;
    serial_key_status: string;
};

type SerialKeyListResponse = {
    response: number;
    serial_list: Serial[];
};

export const fetchSerialKeyStatusList = (
    macId: string,
): APIResponse<SerialKeyListResponse> => {
    let successCallback: (data: SerialKeyListResponse) => void = () => {};
    let errorCallback: (error: any) => void = () => {};

    const result: APIResponse<SerialKeyListResponse> = {
        error(
            callback: (error: any) => void,
        ): APIResponse<SerialKeyListResponse> {
            errorCallback = callback;
            return result;
        },
        success(
            callback: (data: SerialKeyListResponse) => void,
        ): APIResponse<SerialKeyListResponse> {
            successCallback = callback;
            return result;
        },
    };

    axios({
        method: 'post',
        url: getSerialKeyList,
        params: {
            mac_id: macId,
        },
    })
        .then(response => {
            if (
                response.data.response !== 400 &&
                response.data.response === 200
            ) {
                console.log(response.data);
                successCallback(response.data);
            } else {
                console.log('Error');
                console.log(response.data);
                throw new Error(`HTTP error! status: ${response.data.status}`);
            }
        })
        .catch((error: any) => {
            errorCallback(error);
        });

    return result;
};
