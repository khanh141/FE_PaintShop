import { instance } from './instanceAxios';

export const getAllKho = async () => {
    return instance.get('/kho/layTatCa');
};
