import {create} from 'zustand';

type Store = {
    encryptedVideoKey: string;
    authKey: string;
    setKeys: (encryptedVideoKey: string, authKey: string) => void;
};

export const useDrmStore = create<Store>((set, get) => ({
    encryptedVideoKey: '',
    authKey: '',
    setKeys: (encryptedVideoKey: string, authKey: string) => {
        set({encryptedVideoKey: encryptedVideoKey, authKey: authKey});
    },
}));
