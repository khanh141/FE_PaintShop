import { instance } from './instanceAxios';

export const getAllKho = async () => {
    return instance.get('/kho/layTatCa');
};

export const createKho = async (data) => {
    return instance.post('/kho', data);
};
