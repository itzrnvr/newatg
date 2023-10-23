import {useMainVideosRemoteStore} from '../../../store/useMainVideosRemoteStore';

const usePackagesViewModel = () => {
    const {packages, loading, error, fetchMainVideos} =
        useMainVideosRemoteStore();

    return {packages, loading, error, fetchMainVideos};
};

export default usePackagesViewModel;
