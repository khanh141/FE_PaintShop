import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UpdateProductModal({ show, onHide, productData, onSave }) {
    const [formData, setFormData] = useState({
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
    });

    const [options, setOptions] = useState({
        loaiBaoBi: [],
        mau: [],
        loaiDinhMucLyThuyet: [],
    });

    useEffect(() => {
        if (productData) {
            setFormData({
                loai: productData.loai || '',
                ten: productData.ten || '',
                tinhNang: productData.tinhNang || '',
                moTa: productData.moTa || '',
                hinhAnh: productData.hinhAnh || '',
                tenNhaSanXuat: productData.tenNhaSanXuat || '',
                loaiBaoBi:
                    productData.chiTietSanPhamResList[0]?.loaiBaoBi || '',
                mau: productData.chiTietSanPhamResList[0]?.mau || '',
                loaiDinhMucLyThuyet:
                    productData.chiTietSanPhamResList[0]?.loaiDinhMucLyThuyet ||
                    '',
                soLuong: productData.soLuong || '',
            });

            // Load options from chiTietSanPhamResList
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        // Load the related data based on selected values
        const selectedLoaiBaoBi = formData.loaiBaoBi;
        const selectedMau = formData.mau;
        const selectedLoaiDinhMucLyThuyet = formData.loaiDinhMucLyThuyet;

        if (selectedLoaiBaoBi || selectedMau || selectedLoaiDinhMucLyThuyet) {
            const filteredList = productData.chiTietSanPhamResList.filter(
                (item) =>
                    (selectedLoaiBaoBi
                        ? item.loaiBaoBi === selectedLoaiBaoBi
                        : true) &&
                    (selectedMau ? item.mau === selectedMau : true) &&
                    (selectedLoaiDinhMucLyThuyet
                        ? item.loaiDinhMucLyThuyet ===
                          selectedLoaiDinhMucLyThuyet
                        : true)
            );

            // Update the formData based on the filtered list
            if (filteredList.length > 0) {
                setFormData((prevState) => ({
                    ...prevState,
                    ten: filteredList[0].ten || prevState.ten,
                    tinhNang: filteredList[0].tinhNang || prevState.tinhNang,
                    moTa: filteredList[0].moTa || prevState.moTa,
                    hinhAnh: filteredList[0].hinhAnh || prevState.hinhAnh,
                    tenNhaSanXuat:
                        filteredList[0].tenNhaSanXuat ||
                        prevState.tenNhaSanXuat,
                    soLuong: filteredList[0].soLuong || prevState.soLuong,
                }));
            }
        }
    }, [
        formData.loaiBaoBi,
        formData.mau,
        formData.loaiDinhMucLyThuyet,
        productData,
    ]);

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
