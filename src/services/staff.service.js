import { instance } from './instanceAxios';
import axios from 'axios';

export const getStatement = async () => {
    return instance.get('/nhanVien/thongKeDonHang');
};

export const getThongKePhieuXuat = async () => {
    return instance.get('/nhanVien/thongKePhieuXuat');
};

export const getThongKePhieuNhap = async () => {
    return instance.get('/nhanVien/thongKePhieuNhap');
};
