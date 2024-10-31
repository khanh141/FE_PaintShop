import { Button, Col, Table } from 'react-bootstrap';
import OrderTables from '../components/Order';
import { useState } from 'react';
import RegistrationModal from '~/components/RegistrationModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { KEYS } from '~/constants/keys';
import { createAccountStaff, getAllAccount } from '~/services/account.service';

function AdminAccount() {
    const [isShowRegistrationModal, setIsShowRegistrationModal] =
        useState(false);

    const { data, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_ACCOUNT],
        queryFn: () => getAllAccount(),
        staleTime: 1000 * 60 * 5,
    });

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

    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <div>
                <h1 className="text-center mb-5">Quản lý tài khoản</h1>
                <Button
                    className="mt-4 rounded"
                    onClick={() => setIsShowRegistrationModal(true)}
                >
                    Thêm nhân viên
                </Button>

                <Table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên đăng nhập</th>
                            <th>Quyền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render account data */}
                        {!isLoading &&
                            data?.data?.map((prod, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{prod.tenDangNhap}</td>
                                    <td>{prod.quyens}</td>

                                    <td>
                                        <Button>Chi Tiết</Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>

                <RegistrationModal
                    show={isShowRegistrationModal} // Pass the show state
                    onHide={() => setIsShowRegistrationModal(false)} // Close the modal
                    onSubmit={handleFormSubmit} // Handle form submission
                />
            </div>
        </Col>
    );
}

export default AdminAccount;
