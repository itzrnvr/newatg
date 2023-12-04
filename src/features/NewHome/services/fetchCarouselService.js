import {apiClient} from '../../../services/apiClient';

export const fetchCarouselItems = async () => {
    try {
        const response = await apiClient.get('/get_video_slider');
        return response.data;
    } catch (error) {
        console.log(
            'Error fetchin carousel items:',
            error.response?.data || error.message,
        );
        throw error;
    }
};
