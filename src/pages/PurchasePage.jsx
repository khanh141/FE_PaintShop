import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export default function PurchasePage() {
    const { products } = useSelector((state) => state.cart);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("");

    const selectedProducts = products.filter(product => product.isChecked);

    const calculateTotal = () => {
        return selectedProducts.reduce((total, product) => total + product.gia * product.soLuong, 0);
    };

    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
        setShowOptions(false);
    };

    const handleConfirmOrder = async () => {
        const chiTietMuaList = selectedProducts.reduce((acc, product) => {
            const productKey = [
                product.chiTietSanPham.maBaoBi,
                product.chiTietSanPham.maDinhMucLyThuyet,
                product.maSanPham,
                product.chiTietSanPham.maMau
            ].join('-');
            acc[productKey] = product.chiTietSanPham.soLuong;
            return acc;
        }, {});
    
        // Prepare `phuongThucThanhToanDto` as a JSON object
        const phuongThucThanhToanDto = {
            loai: selectedMethod === "Chuyển khoản" ? "Thanh toan truoc" : "Thanh toan khi nhan hang"
        };
    
        // Create FormData and append both JSON objects as blobs
        const formData = new FormData();
        formData.append('chiTietMuaList', new Blob([JSON.stringify(chiTietMuaList)], { type: 'application/json' }));
        formData.append('phuongThucThanhToanDto', new Blob([JSON.stringify(phuongThucThanhToanDto)], { type: 'application/json' }));
    
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
    
        try {
            // Send the FormData as `multipart/form-data`
            const response = await axios.post('http://localhost:8080/gioHang/datHang', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Order Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <Container>
            <h2>Trang mua hàng</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedProducts.length > 0 ? (
                        selectedProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.ten}</td>
                                <td>{product.gia.toLocaleString('vi-VN')} đ</td>
                                <td>{product.soLuong}</td>
                                <td>{(product.gia * product.soLuong).toLocaleString('vi-VN')} đ</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">Chưa có sản phẩm nào được chọn.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h4>Tổng cộng: {calculateTotal().toLocaleString('vi-VN')} đ</h4>

            <h4>Phương thức thanh toán</h4>
            <Button
                style={{ width: '25%', marginBottom: '10px' }}
                onClick={() => setShowOptions(!showOptions)}
                variant={selectedMethod ? "success" : "primary"}
            >
                {selectedMethod || "Chọn phương thức thanh toán"}
            </Button>
            <Row>
                {showOptions && (
                    <div>
                        <Col>
                            <Button
                                style={{ width: '15%', marginBottom: '10px' }}
                                variant="outline-primary"
                                onClick={() => handleSelectMethod("Chuyển khoản")}
                            >
                                Chuyển khoản
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                style={{ width: '15%', marginBottom: '10px' }}
                                variant="outline-success"
                                onClick={() => handleSelectMethod("Tiền mặt")}
                            >
                                Tiền mặt
                            </Button>
                        </Col>
                    </div>
                )}
            </Row>

            <Button variant="danger" className="mt-3" onClick={handleConfirmOrder}>
                Xác nhận
            </Button>
        </Container>
    );
}