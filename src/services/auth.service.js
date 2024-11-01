import { instance } from './instanceAxios';

export const login = async (data) => {
    return instance.post('/taiKhoan/dangNhap', data);
};

export const singup = async (data) => {
    return instance.post('/taiKhoan/dangKy/khachHang', data);
};

export const refreshToken = async (data) => {
    return instance.post('/taiKhoan/taoMoiToken', data);
};
