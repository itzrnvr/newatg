import {fetchKeyStatus} from '../services/activateKeysApiService';

const useActivateKeysController = () => {
    const getMacId = () => {
        return 'sgsgsgsgg';
    };

    const getKeyStatus = (serialKey: string) => {
        fetchKeyStatus(serialKey, getMacId());
    };
};

export default useActivateKeysController;
