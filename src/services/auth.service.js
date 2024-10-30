import { instance } from './instanceAxios';
import axios from 'axios';

export const login = async (data) => {
    return instance.post('/taiKhoan/dangNhap', data);
};

export const singup = async (data) => {
    return instance.post('/taiKhoan/dangKy/khachHang', data);
};
