import { Button, Col, Modal, Table } from 'react-bootstrap';
import OrderTables from '../components/Order';
import { useState } from 'react';
import RegistrationModal from '~/components/RegistrationModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { KEYS } from '~/constants/keys';
import { createAccountStaff, getAllAccount } from '~/services/account.service';

function AdminAccount() {
    const [isShowRegistrationModal, setIsShowRegistrationModal] =
        useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_ACCOUNT],
        queryFn: () => getAllAccount(),
        staleTime: 1000 * 60 * 5,
    });
    console.log(data);

    const mutation = useMutation({
        mutationKey: [KEYS.GET_ALL_ACCOUNT],
        mutationFn: (data) => createAccountStaff(data),
        onSuccess: () => {
            setIsShowRegistrationModal(false);
        },
        onError: (error) => {
            console.error(error);
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
            <h1 className="text-center mb-5">Quản lý tài khoản</h1>
            <div>
                <Button
                    className="mt-4 rounded priColor"
                    onClick={() => setIsShowRegistrationModal(true)}
                >
                    Thêm nhân viên
                </Button>

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
                                                    <Button
                                                        className="rounded me-2"
                                                        variant="danger"
                                                        style={{
                                                            padding: '5px 10px',
                                                            width: '150px',
                                                        }}
                                                    >
                                                        Xóa tài khoản
                                                    </Button>
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
