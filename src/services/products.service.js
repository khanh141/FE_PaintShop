import { instance } from './instanceAxios';

export const getAllProducts = async () => {
    return instance.get('/sanPham/layTatCa');
};

export const createProduct = async (data) => {
    return instance.post('/sanPham', data);
};
