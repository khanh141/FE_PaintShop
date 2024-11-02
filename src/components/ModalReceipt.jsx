import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const InvoiceModal = ({ show, onHide, hoTen, diaChi, selectedProducts, total, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Hóa đơn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 style={{ fontWeight: 'normal' }}>
                    Tên Khách Hàng: {hoTen}
                </h5>
                <h5 style={{ fontWeight: 'normal' }}>
                    Thời gian đặt hàng: {new Date().toLocaleString()}
                </h5>
                <h5 style={{ fontWeight: 'normal' }}>
                    Địa chỉ giao hàng: {diaChi}
                </h5>
                <h5 className="text-center">Thông tin đơn hàng</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th style={{ whiteSpace: 'nowrap' }}>Sản phẩm</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Giá</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Số lượng</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedProducts.map((product) => (
                            <tr key={product.id} className="text-center">
                                <td>{product.ten}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    {product.gia.toLocaleString('vi-VN')} đ
                                </td>
                                <td>{product.soLuong}</td>
                                <td>
                                    {(product.gia * product.soLuong).toLocaleString('vi-VN')}{' '}
                                    đ
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <h4 className="text-end">
                    Tổng cộng: {total.toLocaleString('vi-VN')} đ
                </h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={onConfirm}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvoiceModal;