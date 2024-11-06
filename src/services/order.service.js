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

export const updateProduct = async (
    maSanPham,
    ttSanPhamMoi,
    ttChiTietSanPhamMoi
) => {
    const formData = new FormData();
    if (ttSanPhamMoi && Object.keys(ttSanPhamMoi).length > 0) {
        formData.append(
            'ttSanPhamMoi',
            new Blob([JSON.stringify(ttSanPhamMoi)], {
                type: 'application/json',
            })
        );
    } else {
        console.error('Dữ liệu ttSanPhamMoi không hợp lệ:', ttSanPhamMoi);
        return;
    }

    formData.append(
        'ttChiTietSanPhamMoi',
        new Blob([JSON.stringify(ttChiTietSanPhamMoi)], {
            type: 'application/json',
        })
    );
    return instance.put(`/sanPham/capNhatSanPham/${maSanPham}`, formData);
};
