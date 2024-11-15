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
                Quản lý đơn hàng
            </h1>

            {/* Combobox lọc đơn hàng theo trạng thái (hiển thị nằm ngang với nhãn) */}
            <Form.Group as={Row} className="align-items-center mb-3">
                <Form.Label column sm="auto">
                    <h4>Lọc theo trạng thái:</h4>
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

            <div
                className="mt-4 "
                style={{
                    maxHeight: '70vh',
                    overflowY: 'auto',
                    width: '100%',
                }}
            >
                <Table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
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

                                    borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                }}
                            >
                                Mã đơn hàng
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

                                    borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                }}
                            >
                                Thời điểm
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

                                    borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                }}
                            >
                                Trạng thái
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

                                    borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                }}
                            >
                                Tổng tiền
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

                                    borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                }}
                            >
                                Số sao
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

                                    borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                }}
                            >
                                Đánh giá
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

                                    borderRight: '2px solid #ddd', // Đường gạch giữa cột
                                }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading &&
                            filteredData?.map((prod, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        backgroundColor:
                                            index % 2 === 0
                                                ? '#f9f9f9'
                                                : '#fff',
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        {index + 1}
                                    </td>
                                    <td
                                        style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        {prod.maDonHang}
                                    </td>
                                    <td
                                        style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        {formatDate(prod.thoiDiem)}
                                    </td>
                                    <td
                                        style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        {prod.trangThai === 'Cho_Duyet'
                                            ? 'Chờ Duyệt'
                                            : prod.trangThai}
                                    </td>
                                    <td
                                        style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        {prod.tongTien.toLocaleString()} VND
                                    </td>
                                    <td
                                        style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        {prod.soSao}
                                    </td>
                                    <td
                                        style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        {prod.danhGia}
                                    </td>
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
            </div>
        </Col>
    );
}

export default AdminOrder;
