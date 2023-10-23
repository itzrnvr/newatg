import {useMainVideosRemoteStore} from '../../../store/useMainVideosRemoteStore';

const usePackagesViewModel = () => {
    const {packages, loading, error, resetError, fetchMainVideos} =
        useMainVideosRemoteStore();

    return {packages, loading, error, resetError, fetchMainVideos};
};

export default usePackagesViewModel;
