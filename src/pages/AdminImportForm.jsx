import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button, Col, Modal, Table } from 'react-bootstrap';
import ModalExportForm from '~/components/ModalExportForm';
import ModalImportForm from '~/components/ModalImportForm';
import { KEYS } from '~/constants/keys';
import { getAllProducts, getThongKePhieuNhap } from '~/services';

function AdminImportForm() {
    const [isShowModalImportForm, setIsShowModalImportForm] = useState(false);

    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);
    const {
        data: phieuNhapData,
        isLoading,
        error,
    } = useQuery({
        queryKey: [KEYS.GET_ALL_PHIEU_XUAT],
        queryFn: getThongKePhieuNhap,
    });

    const { data: sanPhamData } = useQuery({
        queryKey: [KEYS.GET_ALL_PRODUCTS],
        queryFn: getAllProducts,
        staleTime: 1000 * 60 * 5,
    });

    const handleShowDetails = (prod) => {
        console.log(prod);

        setSelectedProductDetails(prod);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedProductDetails(null);
    };
    // console.log(phieuNhapData);

    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <h1 className="text-center">Quản Lý Nhập Hàng</h1>

            <div
                style={{ maxHeight: '80vh', overflowY: 'auto', width: '100%' }}
            >
                <Button
                    className="mt-4 rounded"
                    onClick={() => setIsShowModalImportForm(true)}
                >
                    Nhập hàng
                </Button>
                <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
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
                                }}
                            >
                                Mã phiếu nhập
                            </th>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
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
                                }}
                            >
                                Số lượng nhập
                            </th>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
                                }}
                            >
                                Giá nhập
                            </th>
                            <th
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#f0f0f0',
                                    zIndex: 1,
                                }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading &&
                            phieuNhapData?.data?.map((prod, index) => (
                                <tr key={prod.ma}>
                                    <td>{index + 1}</td>
                                    <td>{prod.ma}</td>
                                    <td>
                                        {new Date(
                                            prod.thoiDiem
                                        ).toLocaleString()}
                                    </td>
                                    <td>{prod.soLuongNhapThem}</td>
                                    <td>
                                        {prod?.chiTietSanPhamResDto?.giaTien?.toLocaleString()}{' '}
                                        VND
                                    </td>

                                    <td>
                                        <Button
                                            onClick={() =>
                                                handleShowDetails(prod)
                                            }
                                        >
                                            Chi Tiết
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
            <ModalImportForm
                show={isShowModalImportForm}
                onHide={() => setIsShowModalImportForm(false)}
                // onSubmit={handleAddPhieuXuat}
                sanPhamData={sanPhamData}
            />

            {/* Detail Modal */}
            <Modal
                show={showDetailModal}
                onHide={handleCloseDetailModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin chi tiết sản phẩm </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProductDetails && (
                        <div>
                            <p>
                                <strong>Tên sản phẩm:</strong>{' '}
                                {selectedProductDetails.tenSanPham}
                            </p>
                            <p>
                                <strong>Loại bao bì:</strong>{' '}
                                {
                                    selectedProductDetails.chiTietSanPhamResDto
                                        ?.loaiBaoBi
                                }
                            </p>
                            <p>
                                <strong>Loại định mức lý thuyết:</strong>{' '}
                                {
                                    selectedProductDetails.chiTietSanPhamResDto
                                        ?.loaiDinhMucLyThuyet
                                }
                            </p>
                            <p>
                                <strong>Màu:</strong>{' '}
                                {selectedProductDetails.chiTietSanPhamResDto
                                    ?.mau || 'Chưa có thông tin'}
                            </p>
                            <p>
                                <strong>Số lượng hiện tại:</strong>{' '}
                                {
                                    selectedProductDetails.chiTietSanPhamResDto
                                        ?.soLuong
                                }
                            </p>
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
        </Col>
    );
}

export default AdminImportForm;
