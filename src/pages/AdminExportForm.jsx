import React, { useEffect, useState } from 'react';
import { Button, Col, Table, Modal } from 'react-bootstrap';
import { KEYS } from '~/constants/keys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllProducts, getThongKePhieuXuat } from '~/services';
import ModalExportForm from '~/components/ModalExportForm';
import { useMutation } from '@tanstack/react-query';
import { createPhieuXuat } from '~/services';
import { toast, ToastContainer } from 'react-toastify';

function AdminExportForm() {
    const [isShowModalAddProduct, setIsShowModalAddProduct] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);
    const queryClient = useQueryClient();

    const translateError = (error) => {
        const translations = {
            'San pham het hang': 'Sản phẩm hết hàng',
            'San pham khong du so luong dat': 'Sản phẩm không đủ số lượng',
        };
        return translations[error] || error;
    };

    const {
        data: phieuXuatData,
        isLoading,
        error,
    } = useQuery({
        queryKey: [KEYS.GET_ALL_PHIEU_XUAT],
        queryFn: getThongKePhieuXuat,
    });

    const { data: sanPhamData } = useQuery({
        queryKey: [KEYS.GET_ALL_PRODUCTS],
        queryFn: getAllProducts,
        staleTime: 1000 * 60 * 5,
    });

    const mutation = useMutation({
        mutationKey: [KEYS.GET_ALL_PHIEU_XUAT],
        mutationFn: (data) => createPhieuXuat(data),
        onSuccess: () => {
            toast.success('Xuất hàng thành công', { position: 'top-right' });
            queryClient.invalidateQueries([KEYS.GET_ALL_PHIEU_XUAT]);
            setIsShowModalAddProduct(false); // Ensure the modal is correctly closed
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message || 'Xuất hàng không thành công';
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    const handleAddPhieuXuat = (formData) => {
        const dataToSend = {
            thongTinKhach: {
                sdt: formData.thongTinKhach?.sdt,
                hoTen: formData.thongTinKhach?.hoTen,
                diaChi: formData.thongTinKhach?.diaChi,
            },
            sanPhamMuaDtoList: Array.isArray(formData.sanPhamMuaDtoList)
                ? formData.sanPhamMuaDtoList.map((sanPham) => ({
                      maSanPham: sanPham.maSanPham,
                      chiTietSanPhamReqList: sanPham.chiTietSanPhamReq
                          ? [
                                {
                                    loaiBaoBi:
                                        sanPham.chiTietSanPhamReq.loaiBaoBi,
                                    mau: sanPham.chiTietSanPhamReq.mau,
                                    loaiDinhMucLyThuyet:
                                        sanPham.chiTietSanPhamReq.dinhMuc,
                                    giaTien: sanPham.chiTietSanPhamReq.giaTien,
                                    soLuong: sanPham.chiTietSanPhamReq.soLuong,
                                },
                            ]
                          : [],
                  }))
                : [],
            lyDo: formData.lyDo,
        };
        //    setIsShowModalAddProduct(false);
        //console.log('Thong tin gui: ', dataToSend);

        mutation.mutate(dataToSend);
    };

    const handleShowDetails = (phieu) => {
        setSelectedProductDetails(phieu);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedProductDetails(null);
    };

    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <h1
                style={{
                    fontSize: '2.5rem',
                    color: '#4a90e2', // Màu xanh dương
                    marginBottom: '2rem',
                    marginTop: '2rem',
                    textAlign: 'center',
                    paddingBottom: '0.5rem',
                    letterSpacing: '1px',
                    borderBottom: '2px solid #ccc',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    background: 'linear-gradient(to right, #4a90e2, #50e3c2)',
                    WebkitBackgroundClip: 'text',
                }}
            >
                Quản Lý Sản Phẩm
            </h1>
            <Button
                className="mt-4 rounded priColor"
                onClick={() => setIsShowModalAddProduct(true)}
            >
                Tạo phiếu xuất
            </Button>

            <div
                style={{ maxHeight: '80vh', overflowY: 'auto', width: '100%' }}
                className="mt-4"
            >
                <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
                                    padding: '8px',
                                    textAlign: 'left',
                                    borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                    borderBottom: '2px solid #ddd', // Đường kẻ dưới tiêu đề
                                }}
                            >
                                STT
                            </th>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
                                    padding: '8px',
                                    textAlign: 'left',
                                    borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                    borderBottom: '2px solid #ddd', // Đường kẻ dưới tiêu đề
                                }}
                            >
                                Mã phiếu xuất
                            </th>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
                                    padding: '8px',
                                    textAlign: 'left',
                                    borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                    borderBottom: '2px solid #ddd', // Đường kẻ dưới tiêu đề
                                }}
                            >
                                Thời điểm
                            </th>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
                                    padding: '8px',
                                    textAlign: 'left',
                                    borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                    borderBottom: '2px solid #ddd', // Đường kẻ dưới tiêu đề
                                }}
                            >
                                Lý do
                            </th>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
                                    padding: '8px',
                                    textAlign: 'left',
                                    borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                    borderBottom: '2px solid #ddd', // Đường kẻ dưới tiêu đề
                                }}
                            >
                                Tổng tiền
                            </th>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
                                    padding: '8px',
                                    textAlign: 'left',
                                    borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                    borderBottom: '2px solid #ddd', // Đường kẻ dưới tiêu đề
                                }}
                            >
                                Số điện thoại khách
                            </th>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
                                    padding: '8px',
                                    textAlign: 'center',
                                    borderBottom: '2px solid #ddd', // Đường kẻ dưới tiêu đề
                                }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading &&
                            phieuXuatData &&
                            phieuXuatData?.data?.map((phieu, index) => (
                                <tr key={phieu.maPhieuXuat}>
                                    <td
                                        style={{
                                            padding: '8px',
                                            textAlign: 'left',
                                            borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                            borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                        }}
                                    >
                                        {index + 1}
                                    </td>
                                    <td
                                        style={{
                                            padding: '8px',
                                            textAlign: 'left',
                                            borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                            borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                        }}
                                    >
                                        {phieu.maPhieuXuat}
                                    </td>
                                    <td
                                        style={{
                                            padding: '8px',
                                            textAlign: 'left',
                                            borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                            borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                        }}
                                    >
                                        {new Date(
                                            phieu.thoiDiem
                                        ).toLocaleString()}
                                    </td>
                                    <td
                                        style={{
                                            padding: '8px',
                                            textAlign: 'left',
                                            borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                            borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                        }}
                                    >
                                        {phieu.lyDo}
                                    </td>
                                    <td
                                        style={{
                                            padding: '8px',
                                            textAlign: 'left',
                                            borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                            borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                        }}
                                    >
                                        {phieu.tongTien.toLocaleString()} VND
                                    </td>
                                    <td
                                        style={{
                                            padding: '8px',
                                            textAlign: 'left',
                                            borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                            borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                        }}
                                    >
                                        {phieu.thongTinKhach.soDienThoai}
                                    </td>
                                    <td
                                        style={{
                                            padding: '8px',
                                            textAlign: 'center',
                                            borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                        }}
                                    >
                                        <Button
                                            style={{
                                                background:
                                                    'rgb(145 254 159 / 47%)',
                                                color: 'black',
                                            }}
                                            onClick={() =>
                                                handleShowDetails(phieu)
                                            }
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>

            {/* Modal for Export Form */}
            {sanPhamData && (
                <ModalExportForm
                    show={isShowModalAddProduct}
                    onHide={() => setIsShowModalAddProduct(false)}
                    onSubmit={handleAddPhieuXuat}
                    sanPhamData={sanPhamData}
                />
            )}

            {/* Detail Modal */}
            <Modal
                show={showDetailModal}
                onHide={handleCloseDetailModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết phiếu xuất </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProductDetails && (
                        <div>
                            <span>
                                <strong>Mã: </strong>
                                {selectedProductDetails.maPhieuXuat}
                            </span>
                            <h5 className="my-3">Thông tin khách hàng</h5>
                            <p>
                                <strong>Số điện thoại:</strong>{' '}
                                {
                                    selectedProductDetails.thongTinKhach
                                        .soDienThoai
                                }
                            </p>
                            <p>
                                <strong>Họ tên:</strong>{' '}
                                {selectedProductDetails.thongTinKhach.hoTen}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong>{' '}
                                {selectedProductDetails.thongTinKhach.diaChi}
                            </p>
                            <p>
                                <strong>Email:</strong>{' '}
                                {selectedProductDetails.thongTinKhach.email ||
                                    'Chưa có thông tin'}
                            </p>
                            <hr />
                            <h5 className="my-3">Sản phẩm mua</h5>
                            {selectedProductDetails.sanPhamMuaList.map(
                                (product, index) => (
                                    <div
                                        key={index}
                                        style={{ marginBottom: '1rem' }}
                                        className="sanPhamMuaList"
                                    >
                                        <p>
                                            <strong>Tên sản phẩm:</strong>{' '}
                                            {product.ten}
                                        </p>
                                        <p>
                                            <strong>Loại:</strong>{' '}
                                            {product.loai}
                                        </p>
                                        <p>
                                            <strong>Nhà sản xuất:</strong>{' '}
                                            {product.tenNhaSanXuat}
                                        </p>
                                        <p>
                                            <strong>Số lượng đã bán:</strong>{' '}
                                            {product.soLuongDaBan}
                                        </p>

                                        <h5>Chi tiết sản phẩm</h5>
                                        {product.chiTietSanPhamResList.map(
                                            (detail, detailIndex) => (
                                                <div
                                                    key={detailIndex}
                                                    style={{
                                                        marginLeft: '1rem',
                                                    }}
                                                    className="chiTietSanPhamMuaist"
                                                >
                                                    <p>
                                                        <strong>
                                                            Loại bao bì:
                                                        </strong>{' '}
                                                        {detail.loaiBaoBi}
                                                    </p>
                                                    <p>
                                                        <strong>Màu:</strong>{' '}
                                                        {detail.mau}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Định mức lý thuyết:
                                                        </strong>{' '}
                                                        {
                                                            detail.loaiDinhMucLyThuyet
                                                        }
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Giá tiền:
                                                        </strong>{' '}
                                                        {detail.giaTien.toLocaleString()}{' '}
                                                        VND
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Số lượng:
                                                        </strong>{' '}
                                                        {detail.soLuong}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseDetailModal}
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </Col>
    );
}

export default AdminExportForm;
