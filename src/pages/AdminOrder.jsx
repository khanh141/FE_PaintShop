import { Button, Col, Table } from 'react-bootstrap';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { KEYS } from '~/constants/keys';
import { loadOrder, updateOrderStatus } from '~/services';

function formatDate(dateString) {
    const date = new Date(dateString);

    const seconds = String(date.getSeconds()).padStart(2, '0'); // Always two digits
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Always two digits
    const hours = String(date.getHours()).padStart(2, '0'); // Always two digits

    const day = String(date.getDate()).padStart(2, '0'); // Format to two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${seconds}:${minutes}:${hours}-${day}/${month}/${year}`;
}

function AdminOrder() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: [KEYS.GET_ALL_ORDER],
        queryFn: () => loadOrder(),
        staleTime: 1000 * 60 * 5,
    });

    const mutation = useMutation({
        mutationKey: [KEYS.GET_ALL_ORDER],
        mutationFn: ({ trangThai, data }) => updateOrderStatus(trangThai, data),
        onSuccess: () => {
            refetch(); // Refresh the order data after a successful mutation
        },
        onError: (error) => {
            console.error('Error updating order status:', error);
        },
    });

    function approveOrder(prod) {
        const data = {
            maDonHang: prod.maDonHang,
        };
        mutation.mutate({
            trangThai: 'Đang Giao Hàng', // Set the new status
            data,
        });
    }

    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <h1 className="text-center mb-5">Quản lý đơn hàng</h1>
            <Table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Thời điểm</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                        <th>Số sao</th>
                        <th>Đánh giá</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading &&
                        data?.data?.map((prod, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{prod.maDonHang}</td>
                                <td>{formatDate(prod.thoiDiem)}</td>{' '}
                                {/* Use the formatDate function */}
                                <td>{prod.trangThai}</td>
                                <td>{prod.tongTien}</td>
                                <td>{prod.soSao}</td>
                                <td>{prod.danhGia}</td>
                                <td>
                                    <Button
                                        className="rounded"
                                        variant="info"
                                        onClick={() => approveOrder(prod)}
                                        disabled={
                                            prod.trangThai === 'Đang Giao Hàng'
                                        }
                                    >
                                        Duyệt đơn
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Col>
    );
}

export default AdminOrder;
