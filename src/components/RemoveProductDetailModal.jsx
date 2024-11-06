import React, { useState,useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RemoveProductDetailModal = ({ show, onHide }) => {
    const [loai, setLoai] = useState('');
    const [baoBiOptions, setBaoBiOptions] = useState([]);
    const [mauOptions, setMauOptions] = useState([]);
    const [dinhMucOptions, setDinhMucOptions] = useState([]);
    const [loaiChiTiet, setLoaiChiTiet] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };

                const [ baoBiRes, mauRes, dinhMucRes] = await Promise.all([
                    axios.get('http://localhost:8080/baoBi/layTatCa', { headers }),
                    axios.get('http://localhost:8080/mau/layTatCa', { headers }),
                    axios.get('http://localhost:8080/dinhMucLyThuyet/layTatCa', { headers })
                ]);

               
                setBaoBiOptions(baoBiRes.data);
                setMauOptions(mauRes.data);
                setDinhMucOptions(dinhMucRes.data);
                console.log(baoBiRes.data);
                console.log(mauRes.data);
                console.log(dinhMucRes.data); 
            } catch (error) {
                console.error("API fetch error:", error);
            }
        };
        fetchOptions();
    }, []);
                                                           
    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = getApiUrlForDelete(); 
    
        try {
            const response = await axios.delete(apiUrl, { headers });
            toast.success("xoá chi tiết sản phẩm thành công", { position: "top-right", autoClose: 2000 });
            setTimeout(() => {
                onHide();
            }, 2000);
        } catch (error) {
            console.error('API error:', error);
            toast.error("xoá chi tiết sản phẩm thất bại", { position: "top-right", autoClose: 2000 })
        }
    };
    
    const getApiUrlForDelete = () => {
        switch (loaiChiTiet) {
            case 'Bao bì':
                return 'http://localhost:8080/baoBi/xoa';  ì
            case 'Màu':
                return 'http://localhost:8080/mau/xoa';  
            case 'Định mức lý thuyết':
                return 'http://localhost:8080/dinhMucLyThuyet/xoa';  
            default:
                return '';  
        }
    };
    
    const renderLoaiOptions = () => {
        switch (loaiChiTiet) {
            case 'Bao bì':
                return baoBiOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option}
                    </option>
                ));
            case 'Màu':
                return mauOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option}
                    </option>
                ));
            case 'Định mức lý thuyết':
                return dinhMucOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option}
                    </option>
                ));
            default:
                return <option value="">Chọn loại sản phẩm</option>;
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Xoá Chi Tiết Sản Phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formLoaiChiTiet">
                        <Form.Label>Loại Chi Tiết Sản Phẩm</Form.Label>
                        <Form.Control
                            as="select"
                            value={loaiChiTiet}
                            onChange={(e) => setLoaiChiTiet(e.target.value)}
                        >
                            <option value="">
                                Chọn loại chi tiết muốn xoá
                            </option>
                            <option value="Bao bì">Bao bì</option>
                            <option value="Màu">Màu</option>
                            <option value="Định mức lý thuyết">
                                Định mức lý thuyết
                            </option>
                        </Form.Control>
                    </Form.Group>

                    {loaiChiTiet && (
                        <Form.Group controlId="formLoaiOptions">
                            <Form.Label>Chọn Loại</Form.Label>
                            <Form.Control
                                as="select"
                                value={loai}
                                onChange={(e) => setLoai(e.target.value)}
                            >
                                <option value="">Chọn loại sản phẩm</option>
                                {renderLoaiOptions()}
                            </Form.Control>
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Xác nhận xoá
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal>
    );
};

export default RemoveProductDetailModal;
