import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    deleteBaobi,
    deleteDinhMucLyThuyet,
    deleteMau,
} from '~/services/productDetail.service';

const RemoveProductDetailModal = ({
    show,
    onHide,
    mauOptions,
    baoBiOptions,
    dinhMucOptions,
}) => {
    const [loai, setLoai] = useState('');
    const [loaiChiTiet, setLoaiChiTiet] = useState('');

    useEffect(() => {
        if (show) {
            // Reset dữ liệu về mặc định khi mở modal
            setLoai('');
            setLoaiChiTiet('');
        }
    }, [show]);

    const handleDelete = async () => {
        try {
            let response;
            if (loaiChiTiet === 'Bao bì') {
                response = await deleteBaobi(loai);
            } else if (loaiChiTiet === 'Màu') {
                response = await deleteMau(loai);
            } else {
                response = await deleteDinhMucLyThuyet(loai);
            }

            if (response.status === 200) {
                toast.success(`${loaiChiTiet} đã được xóa thành công`, {
                    position: 'top-right',
                    autoClose: 3000,
                });
                onHide(); // Đóng modal ngay sau khi thông báo thành công
            }
        } catch (error) {
            const errorMessage =
                error.response?.data || `${loai} xóa không thành công!`;
            toast.error(
                `Lỗi khi xóa ${loaiChiTiet.toLowerCase()}: ${errorMessage}`,
                {
                    position: 'top-right',
                    autoClose: 3000,
                }
            );
            onHide();
            console.error(
                `Lỗi khi xóa ${loaiChiTiet.toLowerCase()}:`,
                errorMessage
            );
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
            {/* <ToastContainer /> */}
        </Modal>
    );
};

export default RemoveProductDetailModal;
