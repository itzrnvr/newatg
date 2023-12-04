import axios from 'axios';
export const apiClient = axios.create({
    baseURL:
        'https://junglebookpune.org/test_awaken_genius/webserv/Webserv_mobile_react',
});
