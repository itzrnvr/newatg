// import {StateStorage} from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// const zustandStorage: StateStorage = {
//     setItem: async (name, value) => {
//         await AsyncStorage.setItem(name, value);
//     },
//     getItem: async name => {
//         const value = await AsyncStorage.getItem(name);
//         return value ?? null;
//     },
//     removeItem: async name => {
//         await AsyncStorage.removeItem(name);
//     },
// };
//
// export default zustandStorage;

// import {StateStorage} from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// const storage = AsyncStorage;
//
// const zustandStorage: StateStorage = {
//     setItem: async (name, value) => {
//         await storage.setItem(name, JSON.stringify(value));
//     },
//     getItem: async name => {
//         const value = await storage.getItem(name);
//         return value ? JSON.parse(value) : null;
//     },
//     removeItem: async name => {
//         await storage.removeItem(name);
//     },
// };
//
// export default zustandStorage;

import {StateStorage} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        return storage.set(name, value);
    },
    getItem: name => {
        const value = storage.getString(name);
        return value ?? null;
    },
    removeItem: name => {
        return storage.delete(name);
    },
};

export default zustandStorage;
