import { instance } from './instanceAxios';
import axios from 'axios';

export const getStatement = async () => {
    return instance.get('/nhanVien/thongKeDonHang');
};
