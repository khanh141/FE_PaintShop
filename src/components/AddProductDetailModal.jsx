import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddProductDetailModal = ({ show, onHide, onSave }) => {
    // State lưu trữ giá trị của các trường
    const [loaiChiTiet, setLoaiChiTiet] = useState('');
    const [moTa, setMoTa] = useState('');

    // Hàm xử lý khi người dùng bấm nút Lưu
    const handleSave = () => {
        const newDetail = {
            loaiChiTiet,
            moTa,
        };
        onSave(newDetail);
        onHide(); // Đóng modal sau khi lưu
    };
    useEffect(() => {
        if (show) {
            // Reset dữ liệu về mặc định khi mở modal
            setLoaiChiTiet('');
            setMoTa('');
        }
    }, [show]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Chi Tiết Sản Phẩm</Modal.Title>
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
                            <option value="">Chọn loại chi tiết</option>
                            <option value="Bao bì">Bao bì</option>
                            <option value="Màu">Màu</option>
                            <option value="Định mức lý thuyết">
                                Định mức lý thuyết
                            </option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formMoTa">
                        <Form.Label>Mô Tả</Form.Label>
                        <Form.Control
                            type="text"
                            value={moTa}
                            onChange={(e) => setMoTa(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddProductDetailModal;
