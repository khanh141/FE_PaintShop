import { instance } from './instanceAxios';

export const loadOrder = async () => {
    return instance.get('/donHang/taiDonHang');
};

export const updateOrderStatus = async (trangThai, data) => {
    return instance.post(`/nhanVien/capNhapTrangThai/${trangThai}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
