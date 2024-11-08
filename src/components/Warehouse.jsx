import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { KEYS } from '~/constants/keys';
import { createKho, getAllKho } from '~/services/warehouse.service';
import { toast } from 'react-toastify';

export default function Warehouse() {
    const [showModalAddWarehouse, setShowModalAddWarehouse] = useState(false);
    const [maKho, setMaKho] = useState('');
    const [dienTich, setDienTich] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_KHO],
        queryFn: () => getAllKho(),
        staleTime: 1000 * 60 * 5,
    });

    const createMutation = useMutation({
        mutationKey: [KEYS.GET_ALL_KHO],
        mutationFn: (data) => createKho(data),
        onSuccess: () => {
            toast.success('Thêm kho thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
            queryClient.invalidateQueries([KEYS.GET_ALL_KHO]); // Tự động làm mới dữ liệu sau khi thêm sản phẩm mới
            setShowModalAddWarehouse(false);
        },
        onError: (error) => {
            toast.error('Thêm kho thất bại', {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    // Hàm xử lý khi nhấn "Thêm Kho"
    const handleSubmit = () => {
        const newWarehouse = { maKho, dienTich, diaChi };

        createMutation.mutate(newWarehouse);
    };

    return (
        <div
            style={{
                maxHeight: '80vh',
                overflowY: 'auto',
                width: '100%',
            }}
        >
            <Button
                className="priColor"
                onClick={() => setShowModalAddWarehouse(true)}
            >
                Thêm Kho
            </Button>
            <Table
                className="mt-4"
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
                                padding: '8px',
                                fontWeight: 'bold',
                                textAlign: 'center',
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
                                border: '1px solid #ddd',
                                padding: '8px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                zIndex: 1,
                            }}
                        >
                            Mã kho
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ddd',
                                padding: '8px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                zIndex: 1,
                            }}
                        >
                            Địa chỉ
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ddd',
                                padding: '8px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                zIndex: 1,
                            }}
                        >
                            Diện tích
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ddd',
                                padding: '8px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                zIndex: 1,
                            }}
                        >
                            Số lượng khu
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ddd',
                                padding: '8px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                zIndex: 1,
                                width: '250px',
                            }}
                        >
                            Số lượng sản phẩm
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading &&
                        data?.data?.map((prod, index) => (
                            <tr key={index}>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {index + 1}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {prod.maKho}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {prod.diaChi}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {prod.dienTich} m&sup2;
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {prod.soLuongKhu}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {prod.soLuong}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            {/* Modal thêm kho */}
            <Modal
                show={showModalAddWarehouse}
                onHide={() => setShowModalAddWarehouse(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Kho</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="maKho">
                            <Form.Label>Mã Kho</Form.Label>
                            <Form.Control
                                type="number"
                                value={maKho}
                                onChange={(e) => setMaKho(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="dienTich">
                            <Form.Label>Diện Tích</Form.Label>
                            <Form.Control
                                type="number"
                                value={dienTich}
                                onChange={(e) => setDienTich(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="diaChi">
                            <Form.Label>Địa Chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                value={diaChi}
                                onChange={(e) => setDiaChi(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModalAddWarehouse(false)}
                    >
                        Đóng
                    </Button>
                    <Button className="priColor" onClick={handleSubmit}>
                        Thêm Kho
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
