import {getMainVideos} from 'utils/Constants';
import axios from 'axios';

export interface VideoDetails {
    title: string;
    link: string;
    thumbnail: string;
    video_id: string;
}

export interface Package {
    pkey: string;
    serial_key: string;
    package_fk: string;
    duration: string;
    title: string;
    program_fk: string;
    activate_date: string;
    expiry_date: string;
    serial_key_status: string;
    data: VideoDetails[];
}

export interface PackagesResponse {
    response: number;
    video_list: Package[];
}

export interface APIResponse<T> {
    success: (callback: (data: T | null) => void) => APIResponse<T>;
    error: (callback: (error: any) => void) => APIResponse<T>;
}

export const fetchMainVideos = (
    macId: string,
): APIResponse<PackagesResponse> => {
    let successCallback: (data: PackagesResponse) => void = () => {};
    let errorCallback: (error: any) => void = () => {};

    const result: APIResponse<PackagesResponse> = {
        error(callback: (error: any) => void): APIResponse<PackagesResponse> {
            errorCallback = callback;
            return result;
        },
        success(
            callback: (data: PackagesResponse) => void,
        ): APIResponse<PackagesResponse> {
            successCallback = callback;
            return result;
        },
    };

    axios({
        method: 'post',
        url: getMainVideos,
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
