import { useState } from 'react';
// import Table from "react-bootstrap/Table";
import dataTest from '../testData.json';
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
        setProducts((prev) => {
            return prev.filter((p) => p.id !== prod.id);
        });
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
            <div>
                <Button
                    className="mt-4 rounded"
                    onClick={() => setIsShowModalAddProduct(true)}
                >
                    Add product
                </Button>
                <Table>
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Describe</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading &&
                            data?.data?.map((prod, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{prod.ten}</td>
                                    <td>{prod.loai}</td>
                                    <td>{prod.moTa}</td>

                                    <td>
                                        <Button
                                            className="rounded"
                                            variant="info"
                                            onClick={() => deleteClick(prod)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
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
