import { instance } from './instanceAxios';
import axios from 'axios';

export const getAllProducts = async () => {
    return instance.get('/sanPham/layTatCa');
};

// export const createProduct = async (data) => {
//     return instance.post('/sanPham', data);
// };

// export const createProduct = async (req, imageFile) => {
//     const formData = new FormData();
//     for (const [key, value] of Object.entries(req)) {
//         formData.append(key, value);
//     }
//     if (imageFile) {
//         formData.append('imageFile', imageFile);
//     }
//     console.log(req);
//     // return instance.post('/sanPham', formData);
// };

// export const createProduct = async (req, imageFile) => {
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
