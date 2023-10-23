import {useActivateKeyStore} from '../store/activateKeyStore';

const useActivateKeysViewModel = () => {
    const {loading, serialKey, setSerialKey, submitKey, error, resetError, success} =
        useActivateKeyStore();

    return {
        loading,
        serialKey,
        setSerialKey,
        submitKey,
        error,
        resetError,
        success,
    };
};

export default useActivateKeysViewModel;
