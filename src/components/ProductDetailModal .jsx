import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ProductDetailModal = ({ show, product, onHide }) => {
    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi Tiết Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {product?.chiTietSanPhamResList &&
                    product?.chiTietSanPhamResList?.length > 0 ? (
                        product.chiTietSanPhamResList?.map((item, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <p>
                                    <strong>Loại Bao Bì:</strong>{' '}
                                    {item.loaiBaoBi}
                                </p>
                                <p>
                                    <strong>Màu:</strong> {item.mau}
                                </p>
                                <p>
                                    <strong>Loại Định Mức Lý Thuyết:</strong>{' '}
                                    {item.loaiDinhMucLyThuyet}
                                </p>
                                <p>
                                    <strong>Giá Tiền:</strong> {item.giaTien}{' '}
                                    VND
                                </p>
                                <p>
                                    <strong>Số Lượng:</strong> {item.soLuong}
                                </p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>Không có dữ liệu chi tiết sản phẩm.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductDetailModal;
