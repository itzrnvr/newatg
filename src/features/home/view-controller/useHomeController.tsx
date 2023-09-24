import * as homeService from '../services/homeService';
export default () => {
    const createPerson = () => {
        return homeService.createPerson();
    };

    const getAllPersons = () => {
        return homeService.getAllPersons();
    };

    return {
        createPerson,
        getAllPersons,
    };
};
