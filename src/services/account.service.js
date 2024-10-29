import { instance } from './instanceAxios';

export const getAllAccount = async () => {
    return instance.get('/taiKhoan/layTatCa');
};

export const createAccountStaff = async (data) => {
    return instance.post('/taiKhoan/dangKy/nhanVien', data);
};
