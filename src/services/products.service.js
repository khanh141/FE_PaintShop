import { instance } from './instanceAxios';
import axios from 'axios';

export const getAllProducts = async () => {
    return instance.get('/sanPham/layTatCa');
};

export const createProduct = async (formData) => {
    return instance.post('/sanPham', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const createPhieuXuat = async (data) => {
    return instance.post('/sanPham/xuatHang', data);
};

export const createPhieuNhap = async (data) => {
    return instance.post('/sanPham/nhapHang/hangDaCo', data);
};
