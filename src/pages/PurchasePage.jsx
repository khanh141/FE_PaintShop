import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import InvoiceModal from '../components/ModalReceipt.jsx'; // Import the InvoiceModal component

export default function PurchasePage() {
    const { products } = useSelector((state) => state.cart);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [showInvoice, setShowInvoice] = useState(false);
    const navigate = useNavigate();
    const [diaChi, setDiaChi] = useState(""); 
    const [hoTen, setHoTen] = useState("");
    const selectedProducts = products.filter(product => product.isChecked);

    const calculateTotal = () => {
        return selectedProducts.reduce((total, product) => total + product.gia * product.soLuong, 0);
    };

    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
        setShowOptions(false);
    };

    const handleShowInvoice = () => {
        if (!selectedMethod) {
            toast.warn("Vui lòng chọn phương thức thanh toán trước", { position: "top-right" });
            return;
        }
        setShowInvoice(true);
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

        const phuongThucThanhToanDto = {
            loai: selectedMethod === "Chuyển khoản" ? "Thanh toan truoc" : "Thanh toan khi nhan hang"
        };

        const formData = new FormData();
        formData.append('chiTietMuaList', new Blob([JSON.stringify(chiTietMuaList)], { type: 'application/json' }));
        formData.append('phuongThucThanhToanDto', new Blob([JSON.stringify(phuongThucThanhToanDto)], { type: 'application/json' }));

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:8080/gioHang/datHang', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Order Response:', response.data);
            toast.success("Mua hàng thành công", { position: "top-right", autoClose: 3000 });
            setShowInvoice(false);
            setTimeout(() => {
                navigate("/cart");
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/taiKhoan/trangCaNhan', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDiaChi(response.data.khachHangResDto.diaChi);
                setHoTen(response.data.khachHangResDto.hoTen);
            } catch (error) {
                console.error('Error fetching user info:', error);
                toast.error("Không thể lấy thông tin người dùng", { position: "top-right" });
            }
        };
    
        fetchUserInfo();
    }, []);

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
                                <td>
                                    {(product.gia * product.soLuong).toLocaleString('vi-VN')} đ
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Chưa có sản phẩm nào được chọn.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h4>Tổng cộng: {calculateTotal().toLocaleString('vi-VN')} đ</h4>

            <h4>Phương thức thanh toán</h4>
            <Button
                style={{ width: '25%', marginBottom: '10px' }}
                onClick={() => setShowOptions(!showOptions)}
                variant={selectedMethod ? 'success' : 'primary'}
            >
                {selectedMethod || 'Chọn phương thức thanh toán'}
            </Button>
            <Row>
                {showOptions && (
                    <div>
                        <Col>
                            <Button
                                style={{ width: '15%', marginBottom: '10px' }}
                                variant="outline-primary"
                                onClick={() => handleSelectMethod('Chuyển khoản')}
                            >
                                Chuyển khoản
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                style={{ width: '15%', marginBottom: '10px' }}
                                variant="outline-success"
                                onClick={() => handleSelectMethod('Tiền mặt')}
                            >
                                Tiền mặt
                            </Button>
                        </Col>
                    </div>
                )}
            </Row>

            <Button
                variant="danger"
                className="mt-3"
                onClick={handleShowInvoice}
            >
                Xác nhận
            </Button>
            <ToastContainer />
            <InvoiceModal // Use the InvoiceModal component
                show={showInvoice}
                onHide={() => setShowInvoice(false)}
                hoTen={hoTen}
                diaChi={diaChi}
                selectedProducts={selectedProducts}
                total={calculateTotal()}
                onConfirm={handleConfirmOrder}
            />
        </Container>
    );
}
