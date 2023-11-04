import {useMainVideosRemoteStore} from '../../../store/useMainVideosRemoteStore';
import {useSerialKeyStatusStore} from '../../../store/useSerialKeyStatusStore';

const usePackagesViewModel = () => {
    const {packages, loading, error, resetError, fetchMainVideos} =
        useMainVideosRemoteStore();
    const {
        keys,
        error: keyStatusError,
        resetError: resetKeyStatusError,
        loading: keyStatusLoading,
        keyClickType,
        resetKeyClickType,
        onItemClick,
        fetchKeyStatusList,
    } = useSerialKeyStatusStore();

    return {
        packages,
        keys,
        loading,
        keyStatusLoading,
        error,
        keyStatusError,
        resetError,
        resetKeyStatusError,
        keyClickType,
        onItemClick,
        resetKeyClickType,
        fetchMainVideos,
        fetchKeyStatusList,
    };
};

export default usePackagesViewModel;
