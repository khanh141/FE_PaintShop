import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button, Col, Modal, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import ModalImportForm from '~/components/ModalImportForm';
import { KEYS } from '~/constants/keys';
import {
    createPhieuNhap,
    getAllProducts,
    getThongKePhieuNhap,
} from '~/services';

function AdminImportForm() {
    const [isShowModalImportForm, setIsShowModalImportForm] = useState(false);
    const queryClient = useQueryClient();
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);
    const {
        data: phieuNhapData,
        isLoading,
        error,
    } = useQuery({
        queryKey: [KEYS.GET_ALL_PHIEU_NHAP],
        queryFn: getThongKePhieuNhap,
    });

    const { data: sanPhamData } = useQuery({
        queryKey: [KEYS.GET_ALL_PRODUCTS],
        queryFn: getAllProducts,
        staleTime: 1000 * 60 * 5,
    });

    const createMutation = useMutation({
        mutationKey: [KEYS.GET_ALL_PHIEU_NHAP],
        mutationFn: (data) => createPhieuNhap(data),
        onSuccess: () => {
            toast.success('Thêm phiếu nhập thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
            queryClient.invalidateQueries([KEYS.GET_ALL_PHIEU_NHAP]); // Tự động làm mới dữ liệu sau khi thêm sản phẩm mới
            setIsShowModalImportForm(false);
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || 'Thêm phiếu nhập thất bại';
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    const handleShowDetails = (prod) => {
        //console.log(prod);

        setSelectedProductDetails(prod);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedProductDetails(null);
    };
    // console.log(phieuNhapData);

    const handleAddPhieuNhap = (formData) => {
        console.log(formData);
        const data = {
            maSanPham: formData[0]?.maSanPham,
            loaiBaoBi: formData[0]?.loaiBaoBi,
            dinhMuc: formData[0]?.dinhMuc,
            mau: formData[0]?.mau,
            soLuong: formData[0]?.soLuong,
            giaTien: formData[0]?.giaTien,
            nhaSanXuat: formData[0]?.nhaSanXuat,
        };
        createMutation.mutate(data);
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
                Quản Lý Nhập Hàng
            </h1>
            <div>
                <Button
                    className="priColor"
                    onClick={() => setIsShowModalImportForm(true)}
                >
                    Nhập hàng
                </Button>

                <div
                    className="mt-4"
                    style={{
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        width: '100%',
                    }}
                >
                    <Table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse', // Đảm bảo không có khoảng cách giữa các viền
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                        border: '1px solid #ddd', // Đường kẻ giữa các cột
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
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
                                        border: '1px solid #ddd', // Đường kẻ giữa các cột
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
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
                                        border: '1px solid #ddd', // Đường kẻ giữa các cột
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
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
                                        border: '1px solid #ddd', // Đường kẻ giữa các cột
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
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
                                        border: '1px solid #ddd', // Đường kẻ giữa các cột
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
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
                                        border: '1px solid #ddd', // Đường kẻ giữa các cột
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading &&
                                phieuNhapData?.data?.map((prod, index) => (
                                    <tr key={prod.ma}>
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                padding: '8px',
                                                border: '1px solid #ddd', // Đường kẻ giữa các cột
                                            }}
                                        >
                                            {index + 1}
                                        </td>
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                padding: '8px',
                                                border: '1px solid #ddd', // Đường kẻ giữa các cột
                                            }}
                                        >
                                            {prod.ma}
                                        </td>
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                padding: '8px',
                                                border: '1px solid #ddd', // Đường kẻ giữa các cột
                                            }}
                                        >
                                            {new Date(
                                                prod.thoiDiem
                                            ).toLocaleString()}
                                        </td>
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                padding: '8px',
                                                border: '1px solid #ddd', // Đường kẻ giữa các cột
                                            }}
                                        >
                                            {prod.soLuongNhapThem}
                                        </td>
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                padding: '8px',
                                                border: '1px solid #ddd', // Đường kẻ giữa các cột
                                            }}
                                        >
                                            {prod?.chiTietSanPhamResDto?.giaTien?.toLocaleString()}{' '}
                                            VND
                                        </td>
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                padding: '8px',
                                                border: '1px solid #ddd', // Đường kẻ giữa các cột
                                            }}
                                        >
                                            <Button
                                                style={{
                                                    background:
                                                        'rgb(145 254 159 / 47%)',
                                                    color: 'black',
                                                }}
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
            </div>
            <ModalImportForm
                show={isShowModalImportForm}
                onHide={() => setIsShowModalImportForm(false)}
                onSubmit={handleAddPhieuNhap}
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
