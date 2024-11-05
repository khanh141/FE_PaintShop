import React, { useEffect, useState } from 'react';
import { Button, Col, Table, Modal } from 'react-bootstrap';
import { KEYS } from '~/constants/keys';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getThongKePhieuXuat } from '~/services';
import ModalExportForm from '~/components/ModalExportForm';
import { useMutation } from '@tanstack/react-query';
import { createPhieuXuat } from '~/services';

function AdminExportForm() {
    const [isShowModalAddProduct, setIsShowModalAddProduct] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);

    const { data: phieuXuatData, isLoading, error } = useQuery({
        queryKey: [KEYS.GET_ALL_STATEMENT],
        queryFn: getThongKePhieuXuat,
    });

    const { data: sanPhamData } = useQuery({
        queryKey: [KEYS.GET_ALL_PRODUCTS],
        queryFn: getAllProducts,
        staleTime: 1000 * 60 * 5,
    });

    const mutation = useMutation({
        mutationKey: [KEYS.GET_ALL_STATEMENT],
        mutationFn: (data) => createPhieuXuat(data),
        onSuccess: () => {
            setIsShowModalAddProduct(false);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const handleAddPhieuXuat = (formData) => {
        const dataToSend = {
            thongTinKhach: {
                sdt: formData.sdt,
                hoTen: formData.hoTen,
                diaChi: formData.diaChi,
            },
            sanPhamMuaDtoList: formData.sanPhamMuaDtoList.map((sanPham) => ({
                maSanPham: sanPham.maSanPham,
                chiTietSanPhamReqList: sanPham.chiTietSanPhamReqList.map((detail) => ({
                    maLoaiBaoBi: detail.maLoaiBaoBi,
                    maMau: detail.maMau,
                    maLoaiDinhMucLyThuyet: detail.maLoaiDinhMucLyThuyet,
                    giaTien: detail.giaTien,
                    soLuong: detail.soLuong,
                })),
            })),
            lyDo: formData.lyDo,
        };

        console.log("Formatted data to send:", dataToSend);
        // mutation.mutate(dataToSend);
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
            <h1 className="text-center mb-5">Quản Lý Sản Phẩm</h1>
            <Button className="mt-4 rounded" onClick={() => setIsShowModalAddProduct(true)}>
                Tạo phiếu xuất
            </Button>

            <div style={{ maxHeight: '80vh', overflowY: 'auto', width: '100%' }}>
                <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0', zIndex: 1 }}>STT</th>
                            <th style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0', zIndex: 1 }}>Mã phiếu xuất</th>
                            <th style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0', zIndex: 1 }}>Thời điểm</th>
                            <th style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0', zIndex: 1 }}>Lý do</th>
                            <th style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0', zIndex: 1 }}>Tổng tiền</th>
                            <th style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0', zIndex: 1 }}>Số điện thoại khách</th>
                            <th style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0', zIndex: 1 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && phieuXuatData?.data?.map((phieu, index) => (
                            <tr key={phieu.maPhieuXuat}>
                                <td>{index + 1}</td>
                                <td>{phieu.maPhieuXuat}</td>
                                <td>{new Date(phieu.thoiDiem).toLocaleString()}</td>
                                <td>{phieu.lyDo}</td>
                                <td>{phieu.tongTien.toLocaleString()} VND</td>
                                <td>{phieu.thongTinKhach.soDienThoai}</td>
                                <td>
                                    <Button onClick={() => handleShowDetails(phieu)}>
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
            <Modal show={showDetailModal} onHide={handleCloseDetailModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết phiếu xuất </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProductDetails && (
                        <div>
                            <span><strong>Mã: </strong>{selectedProductDetails.maPhieuXuat}</span>
                            <h5 className='my-3'>Thông tin khách hàng</h5>
                            <p><strong>Số điện thoại:</strong> {selectedProductDetails.thongTinKhach.soDienThoai}</p>
                            <p><strong>Họ tên:</strong> {selectedProductDetails.thongTinKhach.hoTen}</p>
                            <p><strong>Địa chỉ:</strong> {selectedProductDetails.thongTinKhach.diaChi}</p>
                            <p><strong>Email:</strong> {selectedProductDetails.thongTinKhach.email || 'Chưa có thông tin'}</p>
                            <hr />
                            <h5 className="my-3">Sản phẩm mua</h5>
                            {selectedProductDetails.sanPhamMuaList.map((product, index) => (
                                <div key={index} style={{ marginBottom: '1rem' }} className='sanPhamMuaList'>
                                    <p><strong>Tên sản phẩm:</strong> {product.ten}</p>
                                    <p><strong>Loại:</strong> {product.loai}</p>
                                    <p><strong>Nhà sản xuất:</strong> {product.tenNhaSanXuat}</p>
                                    <p><strong>Số lượng đã bán:</strong> {product.soLuongDaBan}</p>

                                    <h5>Chi tiết sản phẩm</h5>
                                    {product.chiTietSanPhamResList.map((detail, detailIndex) => (
                                        <div key={detailIndex} style={{ marginLeft: '1rem' }} className='chiTietSanPhamMuaist'>
                                            <p><strong>Loại bao bì:</strong> {detail.loaiBaoBi}</p>
                                            <p><strong>Màu:</strong> {detail.mau}</p>
                                            <p><strong>Định mức lý thuyết:</strong> {detail.loaiDinhMucLyThuyet}</p>
                                            <p><strong>Giá tiền:</strong> {detail.giaTien.toLocaleString()} VND</p>
                                            <p><strong>Số lượng:</strong> {detail.soLuong}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetailModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default AdminExportForm;