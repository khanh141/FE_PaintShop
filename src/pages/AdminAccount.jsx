import { Button, Col, Modal, Table } from 'react-bootstrap';
import OrderTables from '../components/Order';
import { useState } from 'react';
import RegistrationModal from '~/components/RegistrationModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { KEYS } from '~/constants/keys';
import { createAccountStaff, getAllAccount } from '~/services/account.service';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function AdminAccount() {
    const [isShowRegistrationModal, setIsShowRegistrationModal] =
        useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);

    const queryClient = useQueryClient();

    const quyen = useSelector((state) => state.user.quyen);
    // console.log(quyen);

    const { data, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_ACCOUNT],
        queryFn: () => getAllAccount(),
        // staleTime: 1000 * 60 * 5,
    });
    // console.log(data);

    const mutation = useMutation({
        // mutationKey: [KEYS.GET_ALL_ACCOUNT],
        mutationFn: (data) => {
            return createAccountStaff(data);
        },

        onSuccess: () => {
            toast.success('Thêm nhân viên thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
            queryClient.invalidateQueries([KEYS.GET_ALL_ACCOUNT]);
            setIsShowRegistrationModal(false);
        },
        onError: (error) => {
            const data = error.response?.data;
            const msg = [];
            if (typeof data === 'string') {
                msg.push(data);
            } else {
                for (const [key, value] of Object.entries(data)) {
                    msg.push(value);
                }
            }

            // console.error(error);
            // Lấy thông báo lỗi từ phản hồi của backend nếu có
            const errorMessage = msg[0] || 'Tạo tài khoản thất bại';
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    const handleFormSubmit = (formdata) => {
        mutation.mutate(formdata);
    };

    const handleShowDetails = (prod) => {
        console.log(prod);

        setSelectedProductDetails(prod);
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
                Quản lý tài khoản
            </h1>
            <div>
                {quyen !== 'nhanVien' && (
                    <Button
                        className="mt-4 rounded priColor"
                        onClick={() => setIsShowRegistrationModal(true)}
                    >
                        Thêm nhân viên
                    </Button>
                )}

                <div
                    style={{
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        width: '100%',
                    }}
                >
                    <Table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse', // Đảm bảo các viền không bị trùng nhau
                            marginTop: '20px',
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        border: '1px solid #ddd',
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        width: '5%',
                                        borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                    }}
                                >
                                    STT
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        border: '1px solid #ddd',
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        width: '30%',
                                        borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                    }}
                                >
                                    Tên đăng nhập
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        border: '1px solid #ddd',
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        width: '30%',
                                        borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                    }}
                                >
                                    Email
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        border: '1px solid #ddd',
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        width: '20%',
                                        borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                    }}
                                >
                                    Số điện thoại
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        border: '1px solid #ddd',
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        width: '30%',
                                        borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                    }}
                                >
                                    Quyền
                                </th>
                                <th
                                    colSpan="2"
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        border: '1px solid #ddd',
                                        padding: '10px 8px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        width: '20%',
                                    }}
                                >
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading &&
                                data?.data?.map(
                                    (prod, index) =>
                                        prod?.quyens[0] !== 'quanTriVien' && (
                                            <tr
                                                key={index}
                                                style={{
                                                    borderBottom:
                                                        '1px solid #ddd',
                                                }}
                                            >
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: '8px',
                                                        borderRight:
                                                            '2px solid #ddd',
                                                    }}
                                                >
                                                    {index + 1}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: '8px',
                                                        borderRight:
                                                            '2px solid #ddd',
                                                        width: '180px',
                                                    }}
                                                >
                                                    {prod.tenDangNhap}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: '8px',
                                                        borderRight:
                                                            '2px solid #ddd',
                                                    }}
                                                >
                                                    {prod.email}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: '8px',
                                                        borderRight:
                                                            '2px solid #ddd',
                                                    }}
                                                >
                                                    {prod.soDienThoai}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: '8px',
                                                        borderRight:
                                                            '2px solid #ddd',
                                                        width: '150px',
                                                    }}
                                                >
                                                    {prod.quyens[0] ===
                                                    'nhanVien'
                                                        ? 'Nhân viên'
                                                        : prod.quyens[0] ===
                                                          'khachHang'
                                                        ? 'Khách hàng'
                                                        : prod.quyens[0]}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: '8px',
                                                    }}
                                                >
                                                    <Button
                                                        className="rounded me-2"
                                                        variant="info"
                                                        style={{
                                                            padding: '5px 10px',
                                                            width: '100px',
                                                        }}
                                                        onClick={() =>
                                                            handleShowDetails(
                                                                prod
                                                            )
                                                        }
                                                    >
                                                        Chi Tiết
                                                    </Button>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: '8px',
                                                    }}
                                                >
                                                    {quyen !== 'nhanVien' && (
                                                        <Button
                                                            className="rounded me-2"
                                                            variant="danger"
                                                            style={{
                                                                padding:
                                                                    '5px 10px',
                                                                width: '150px',
                                                            }}
                                                        >
                                                            Xóa tài khoản
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                )}
                        </tbody>
                    </Table>
                </div>

                <RegistrationModal
                    show={isShowRegistrationModal} // Pass the show state
                    onHide={() => setIsShowRegistrationModal(false)} // Close the modal
                    onSubmit={handleFormSubmit} // Handle form submission
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
                                    <strong>Họ tên:</strong>{' '}
                                    {selectedProductDetails.hoTen}
                                </p>
                                <p>
                                    <strong>Địa chỉ:</strong>{' '}
                                    {selectedProductDetails.diaChi}
                                </p>
                                <p>
                                    <strong>Số điện thoại:</strong>{' '}
                                    {selectedProductDetails.soDienThoai}
                                </p>
                                <p>
                                    <strong>Email:</strong>{' '}
                                    {selectedProductDetails.email}
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
            </div>
        </Col>
    );
}

export default AdminAccount;
