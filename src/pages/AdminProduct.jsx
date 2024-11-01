import { useState } from 'react';
// import Table from "react-bootstrap/Table";
import ModalAddProduct from '../components/ModalAddProduct';
import { Col, Button, Table } from 'react-bootstrap';
import { useMutation, useQuery } from '@tanstack/react-query';
import { KEYS } from '~/constants/keys';
import { createProduct, getAllProducts } from '~/services';
// import Button from 'react-bootstrap/Button';

function AdminProduct() {
    const [isShowModalAddProduct, setIsShowModalAddProduct] = useState(false);
    const { data, error, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_PRODUCTS],
        queryFn: () => getAllProducts(),
        staleTime: 1000 * 60 * 5,
    });
    // console.log(localStorage.getItem('token'));
    const mutation = useMutation({
        mutationKey: [KEYS.GET_ALL_PRODUCTS],
        mutationFn: (data) => createProduct(data),
        onSuccess: () => {
            setIsShowModalAddProduct(false);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    function deleteClick(prod) {
        console.log(prod);
        // setProducts((prev) => {
        //     return prev.filter((p) => p.id !== prod.id);
        // });
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            Object.assign(data, { [key]: value });
        });
        mutation.mutate(data);
    };
    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <h1 className="text-center mb-5">Quản Lý Sản Phẩm</h1>
            <div>
                <Button
                    className="mt-4 rounded"
                    onClick={() => setIsShowModalAddProduct(true)}
                >
                    Thêm sản phẩm
                </Button>
                <div
                    style={{
                        maxHeight: '80vh' /* Chiều cao tối đa của bảng */,
                        overflowY: 'auto' /* Cuộn dọc khi dữ liệu quá nhiều */,
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
                                        backgroundColor:
                                            '#f0f0f0' /* Nền cố định cho tiêu đề */,
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
                                    Tên sản phẩm
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >
                                    Loại
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >
                                    Tên nhà sản xuất
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
                                data?.data?.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{prod.ten}</td>
                                        <td>{prod.loai}</td>
                                        <td>{prod.tenNhaSanXuat}</td>
                                        <td>
                                            <Button
                                                className="rounded"
                                                variant="info"
                                                onClick={() =>
                                                    deleteClick(prod)
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

                <ModalAddProduct
                    show={isShowModalAddProduct}
                    onHide={() => setIsShowModalAddProduct(false)}
                    onSubmit={handleAddProduct}
                />
            </div>
        </Col>
    );
}

export default AdminProduct;
