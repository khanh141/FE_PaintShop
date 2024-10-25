import { instance } from './instanceAxios';

export const login = async (data) => {
    return instance.post('/taiKhoan/dangNhap', data);
};
