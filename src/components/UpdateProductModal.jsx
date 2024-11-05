import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UpdateProductModal({ show, onHide, productData, onSave }) {
    const [formData, setFormData] = useState({
        maSanPham: '',
        loai: '',
        ten: '',
        tinhNang: '',
        moTa: '',
        hinhAnh: '',
        tenNhaSanXuat: '',
        loaiBaoBi: '',
        mau: '',
        loaiDinhMucLyThuyet: '',
        soLuong: '',
        maBaoBi: '',
        maDinhMucLyThuyet: '',
        maSanPham: '',
        maMau: '',
    });

    const [options, setOptions] = useState({
        loaiBaoBi: [],
        mau: [],
        loaiDinhMucLyThuyet: [],
    });

    // Khởi tạo formData và options khi nhận được productData
    useEffect(() => {
        if (productData) {
            setFormData({
                maSanPham: productData.maSanPham,
                loai: productData.loai || '',
                ten: productData.ten || '',
                tinhNang: productData.tinhNang || '',
                moTa: productData.moTa || '',
                hinhAnh: productData.hinhAnh || '',
                tenNhaSanXuat: productData.tenNhaSanXuat || '',
                loaiBaoBi: productData.loaiBaoBi || '', // Thêm giá trị ban đầu
                mau: productData.mau || '', // Thêm giá trị ban đầu
                loaiDinhMucLyThuyet: productData.loaiDinhMucLyThuyet || '', // Thêm giá trị ban đầu
                soLuong: productData.soLuong || '', // Thêm giá trị ban đầu
            });

            // Khởi tạo tất cả options dựa trên chiTietSanPhamResList ban đầu
            setOptions({
                loaiBaoBi: Array.from(
                    new Set(
                        productData.chiTietSanPhamResList.map(
                            (item) => item.loaiBaoBi
                        )
                    )
                ),
                mau: Array.from(
                    new Set(
                        productData.chiTietSanPhamResList.map(
                            (item) => item.mau
                        )
                    )
                ),
                loaiDinhMucLyThuyet: Array.from(
                    new Set(
                        productData.chiTietSanPhamResList.map(
                            (item) => item.loaiDinhMucLyThuyet
                        )
                    )
                ),
            });
        }
    }, [productData]);

    // Cập nhật các options khi một trong ba trường thay đổi mà không làm mất giá trị hiện tại của formData
    useEffect(() => {
        if (productData) {
            const filteredList = productData.chiTietSanPhamResList.filter(
                (item) =>
                    (!formData.loaiBaoBi ||
                        item.loaiBaoBi === formData.loaiBaoBi) &&
                    (!formData.mau || item.mau === formData.mau) &&
                    (!formData.loaiDinhMucLyThuyet ||
                        item.loaiDinhMucLyThuyet ===
                            formData.loaiDinhMucLyThuyet)
            );

            setOptions({
                loaiBaoBi: Array.from(
                    new Set(filteredList.map((item) => item.loaiBaoBi))
                ),
                mau: Array.from(new Set(filteredList.map((item) => item.mau))),
                loaiDinhMucLyThuyet: Array.from(
                    new Set(
                        filteredList.map((item) => item.loaiDinhMucLyThuyet)
                    )
                ),
            });
        }
    }, [
        formData.loaiBaoBi,
        formData.mau,
        formData.loaiDinhMucLyThuyet,
        productData,
    ]);

    useEffect(() => {
        if (
            formData.loaiBaoBi &&
            formData.mau &&
            formData.loaiDinhMucLyThuyet
        ) {
            const selectedDetail = productData.chiTietSanPhamResList.find(
                (item) =>
                    item.loaiBaoBi === formData.loaiBaoBi &&
                    item.mau === formData.mau &&
                    item.loaiDinhMucLyThuyet === formData.loaiDinhMucLyThuyet
            );
            console.log(selectedDetail);

            if (selectedDetail) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    maBaoBi: selectedDetail.maBaoBi,
                    maDinhMucLyThuyet: selectedDetail.maDinhMucLyThuyet,
                    maMau: selectedDetail.maMau,
                    soLuong: selectedDetail.soLuong,
                }));
            }
        }
    }, [
        formData.loaiBaoBi,
        formData.mau,
        formData.loaiDinhMucLyThuyet,
        productData,
    ]);
    // Xử lý sự thay đổi của các trường
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        onSave(formData);

        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Cập Nhật Sản Phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formLoai">
                        <Form.Label>Loại</Form.Label>
                        <Form.Control
                            type="text"
                            name="loai"
                            value={formData.loai}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTen">
                        <Form.Label>Tên</Form.Label>
                        <Form.Control
                            type="text"
                            name="ten"
                            value={formData.ten}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTinhNang">
                        <Form.Label>Tính Năng</Form.Label>
                        <Form.Control
                            type="text"
                            name="tinhNang"
                            value={formData.tinhNang}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMoTa">
                        <Form.Label>Mô Tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="moTa"
                            value={formData.moTa}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formHinhAnh">
                        <Form.Label>Hình Ảnh</Form.Label>
                        <Form.Control
                            type="text"
                            name="hinhAnh"
                            value={formData.hinhAnh}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTenNhaSanXuat">
                        <Form.Label>Tên Nhà Sản Xuất</Form.Label>
                        <Form.Control
                            type="text"
                            name="tenNhaSanXuat"
                            value={formData.tenNhaSanXuat}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLoaiBaoBi">
                        <Form.Label>Loại Bao Bì</Form.Label>
                        <Form.Control
                            as="select"
                            name="loaiBaoBi"
                            value={formData.loaiBaoBi}
                            onChange={handleChange}
                        >
                            <option value="">Chọn loại bao bì</option>
                            {options.loaiBaoBi.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formMau">
                        <Form.Label>Màu</Form.Label>
                        <Form.Control
                            as="select"
                            name="mau"
                            value={formData.mau}
                            onChange={handleChange}
                        >
                            <option value="">Chọn màu</option>
                            {options.mau.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formLoaiDinhMucLyThuyet">
                        <Form.Label>Loại Định Mức Lý Thuyết</Form.Label>
                        <Form.Control
                            as="select"
                            name="loaiDinhMucLyThuyet"
                            value={formData.loaiDinhMucLyThuyet}
                            onChange={handleChange}
                        >
                            <option value="">
                                Chọn loại định mức lý thuyết
                            </option>
                            {options.loaiDinhMucLyThuyet.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formSoLuong">
                        <Form.Label>Số Lượng</Form.Label>
                        <Form.Control
                            type="number"
                            name="soLuong"
                            value={formData.soLuong}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateProductModal;
