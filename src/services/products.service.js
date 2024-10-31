import { instance } from './instanceAxios';
import axios from 'axios';

export const getAllProducts = async () => {
    return instance.get('/sanPham/layTatCa');
};

export const createProduct = async (data) => {
    return instance.post('/sanPham', data);
};
