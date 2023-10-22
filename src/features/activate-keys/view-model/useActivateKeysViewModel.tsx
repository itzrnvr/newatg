import {useActivateKeyStore} from '../store/activateKeyStore';

const useActivateKeysViewModel = () => {
    const {loading, serialKey, setSerialKey, submitKey, error, success} =
        useActivateKeyStore();

    return {
        loading,
        serialKey,
        setSerialKey,
        submitKey,
        error,
        success,
    };
};

export default useActivateKeysViewModel;
