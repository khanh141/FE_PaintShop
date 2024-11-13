import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InvoiceModal from '../components/ModalReceipt.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PurchasePage() {
    const { products } = useSelector((state) => state.cart);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [showInvoice, setShowInvoice] = useState(false);
    const [savedProducts, setSavedProducts] = useState([]);
    const navigate = useNavigate();
    const [diaChi, setDiaChi] = useState('');
    const [hoTen, setHoTen] = useState('');
    const location = useLocation();

   
    const selectedProducts = products.filter((product) => product.isChecked);
    const calculateTotal = () => {
        const total = selectedProducts.reduce(
            (total, product) =>
                total +
                product.chiTietSanPham.giaTien * product.chiTietSanPham.soLuong,
            0
        );
        localStorage.setItem('total', total);
        return total;
    };

    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
        setShowOptions(false);
    };

    const handleShowInvoice = () => {
        if (!selectedMethod) {
            toast.warn('Vui lòng chọn phương thức thanh toán trước', {
                position: 'top-right',
            });
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
                product.chiTietSanPham.maMau,
            ].join('-');
            acc[productKey] = product.chiTietSanPham.soLuong;
            return acc;
        }, {});

        setSavedProducts(selectedProducts);
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        
        
        const phuongThucThanhToanDto = {
            loai:
                selectedMethod === 'Chuyển khoản'
                    ? 'Thanh toan truoc'
                    : 'Thanh toan khi nhan hang',
        };

        const formData = new FormData();
        formData.append(
            'chiTietMuaList',
            new Blob([JSON.stringify(chiTietMuaList)], {
                type: 'application/json',
            })
        );
        formData.append(
            'phuongThucThanhToanDto',
            new Blob([JSON.stringify(phuongThucThanhToanDto)], {
                type: 'application/json',
            })
        );

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'http://localhost:8080/gioHang/datHang',
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (selectedMethod === 'Chuyển khoản') {
                // Initiate payment via VNPay if selected method is "Chuyển khoản"
                const amount = response.data;
                const bankCode = 'NCB';
                await handlePayByVNPay(amount, bankCode, token);
            } else if (selectedMethod === 'Tiền mặt') {
                setShowInvoice(true);
                toast.success('Đặt hàng thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            const errorMessage =
                error.response?.data || 'Thêm sản phẩm thất bại';
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:8080/taiKhoan/trangCaNhan',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setDiaChi(response.data.khachHangResDto.diaChi);
                setHoTen(response.data.khachHangResDto.hoTen);
            } catch (error) {
                toast.error('Không thể lấy thông tin người dùng', {
                    position: 'top-right',
                });
            }
        };

        fetchUserInfo();
    }, []);

    const handlePayByVNPay = async (amount, bankCode, token) => {
        try {
            const response = await axios.get(
                'http://localhost:8080/thanhToan/taoThanhToan',
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { amount, bankCode },
                }
            );

            const vnPayUrl = response.data.URL;

            if (vnPayUrl) {
                window.location.href = vnPayUrl; // Redirect to VNPay's URL
            }
        } catch (error) {
            toast.error(error.message, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const handleInvoiceConfirm = () => {
        setShowInvoice(false);
        // navigate("/cart")
    };

    useEffect(() => {
        const savedProductsData = localStorage.getItem('selectedProducts');
        if (savedProductsData) {
            setSavedProducts(JSON.parse(savedProductsData)); // Lấy dữ liệu từ localStorage
        }

        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        if (status === 'success') {
            setShowInvoice(true); // Hiển thị hóa đơn
            toast.success('Thanh toán thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
        } else if (status === 'failed') {
            toast.error('Thanh toán không thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
        params.delete('status');
        navigate({ search: params.toString() }, { replace: true });
    }, [location.search, navigate]);

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
                                <td>
                                    {product.chiTietSanPham.giaTien.toLocaleString(
                                        'vi-VN'
                                    )}{' '}
                                    đ
                                </td>
                                <td>{product.chiTietSanPham.soLuong}</td>
                                <td>
                                    {(
                                        product.chiTietSanPham.giaTien *
                                        product.chiTietSanPham.soLuong
                                    ).toLocaleString('vi-VN')}{' '}
                                    đ
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
                                onClick={() =>
                                    handleSelectMethod('Chuyển khoản')
                                }
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
                onClick={handleConfirmOrder}
            >
                Xác nhận mua hàng
            </Button>

            <InvoiceModal // Use the InvoiceModal component
                show={showInvoice}
                onHide={() => setShowInvoice(false)}
                hoTen={hoTen}
                diaChi={diaChi}
                selectedProducts={savedProducts.length > 0 ? savedProducts : selectedProducts}
                total={localStorage.getItem('total')}
                onConfirm={handleInvoiceConfirm}
            />
            {/* <ToastContainer /> */}
        </Container>
    );
}