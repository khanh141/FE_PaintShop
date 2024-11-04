import { Button, Col, Table, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { KEYS } from '~/constants/keys';
import { loadOrder, updateOrderStatus } from '~/services';

function formatDate(dateString) {
    const date = new Date(dateString);
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${seconds}:${minutes}:${hours} ${day}/${month}/${year}`;
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
            refetch();
        },
        onError: (error) => {
            console.error('Error updating order status:', error);
        },
    });

    const [filterStatus, setFilterStatus] = useState(''); // Trạng thái được chọn để lọc

    function approveOrder(prod) {
        const data = {
            maDonHang: prod.maDonHang,
        };
        mutation.mutate({
            trangThai: 'Đang Giao Hàng',
            data,
        });
    }

    function cancelOrder(prod) {
        const data = {
            maDonHang: prod.maDonHang,
        };
        mutation.mutate({
            trangThai: 'Hủy',
            data,
        });
    }

    // Lọc dữ liệu đơn hàng theo trạng thái đã chọn
    const filteredData = data?.data?.filter(
        (order) => filterStatus === '' || order.trangThai === filterStatus
    );

    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <h1 className="text-center mb-5">Quản lý đơn hàng</h1>

            {/* Combobox lọc đơn hàng theo trạng thái (hiển thị nằm ngang với nhãn) */}
            <Form.Group as={Row} className="align-items-center mb-3">
                <Form.Label column sm="auto">
                    Lọc theo trạng thái:
                </Form.Label>
                <Col sm="auto">
                    <Form.Control
                        as="select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="Cho_Duyet">Chờ Duyệt</option>
                        <option value="Đang Giao Hàng">Đang Giao Hàng</option>
                        {/* <option value="Đã Giao">Đã Giao</option> */}
                        <option value="Hủy">Hủy</option>
                    </Form.Control>
                </Col>
            </Form.Group>

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
                        filteredData?.map((prod, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{prod.maDonHang}</td>
                                <td>{formatDate(prod.thoiDiem)}</td>
                                <td>
                                    {prod.trangThai === 'Cho_Duyet'
                                        ? 'Chờ Duyệt'
                                        : prod.trangThai}
                                </td>
                                <td>{prod.tongTien} VND</td>
                                <td>{prod.soSao}</td>
                                <td>{prod.danhGia}</td>
                                <td>
                                    <Button
                                        className="rounded me-2"
                                        variant="info"
                                        onClick={() => approveOrder(prod)}
                                        disabled={
                                            prod.trangThai ===
                                                'Đang Giao Hàng' ||
                                            prod.trangThai === 'Hủy'
                                        }
                                    >
                                        Duyệt đơn
                                    </Button>
                                    <Button
                                        className="rounded"
                                        variant="danger"
                                        onClick={() => cancelOrder(prod)}
                                        disabled={
                                            prod.trangThai ===
                                                'Đang Giao Hàng' ||
                                            prod.trangThai === 'Hủy'
                                        }
                                    >
                                        Hủy
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
