import { instance } from './instanceAxios';

export const getAllAccount = async () => {
    return instance.get('/taiKhoan/layTatCa');
};

export const createAccountStaff = async (data) => {
    return instance.post('/taiKhoan/dangKy/nhanVien', data);
};

export const Logout = async (token) => {
    return instance.post('/taiKhoan/dangXuat', { token });
};

export const deleteAccountStaff = async (tenDangNhap) => {
    return instance.delete(`/taiKhoan/${tenDangNhap}`);
};
