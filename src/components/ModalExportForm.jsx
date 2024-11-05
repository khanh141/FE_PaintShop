import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Form } from 'react-bootstrap';

function ModalExportForm({ show, onHide, onSubmit, sanPhamData }) {
    const [thongTinKhach, setThongTinKhach] = useState({
        sdt: '',
        hoTen: '',
        diaChi: '',
    });
    const [sanPhamMuaDtoList, setSanPhamMuaDtoList] = useState([
        { maSanPham: '', chiTietSanPhamReq: {} },
    ]);
    const lyDo = 'muaHang';

    const handleSanPhamChange = (productIndex, e) => {
        const selectedMaSanPham = e.target.value;
        const selectedProduct = sanPhamData.data.find(
            (sp) => sp.maSanPham === parseInt(selectedMaSanPham, 10)
        );

        setSanPhamMuaDtoList((prevList) => {
            const updatedList = [...prevList];
            updatedList[productIndex] = {
                ...updatedList[productIndex],
                maSanPham: selectedMaSanPham,
                chiTietSanPhamReq: {
                    maBaoBi: '',
                    maMau: '',
                    maLoaiDinhMucLyThuyet: '',
                    giaTien: selectedProduct
                        ? selectedProduct.chiTietSanPhamResList[0].giaTien
                        : '',
                    soLuong: '',
                },
            };
            return updatedList;
        });
    };

    const handleDetailChange = (productIndex, field, value) => {
        setSanPhamMuaDtoList((prevList) => {
            const updatedList = [...prevList];
            updatedList[productIndex].chiTietSanPhamReq = {
                ...updatedList[productIndex].chiTietSanPhamReq,
                [field]: value,
            };
            return updatedList;
        });
    };

    const handleAddProduct = () => {
        setSanPhamMuaDtoList([
            ...sanPhamMuaDtoList,
            {
                maSanPham: '',
                chiTietSanPhamReq: {
                    maLoaiBaoBi: '',
                    maMau: '',
                    maLoaiDinhMucLyThuyet: '',
                    giaTien: '',
                    soLuong: '',
                },
            },
        ]);
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = sanPhamMuaDtoList.filter((_, i) => i !== index);
        setSanPhamMuaDtoList(updatedProducts);
    };

    const handleChangeCustomer = (e) => {
        const { name, value } = e.target;
        setThongTinKhach((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn reload
        onSubmit({ thongTinKhach, sanPhamMuaDtoList, lyDo });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm phiếu xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body className="addPhieuXuatForm">
                    <Col>
                        {/* Customer Information */}
                        <Row className="thongTinKhach">
                            <h5>Thông tin khách</h5>
                            <div className="d-flex gap-2">
                                <label className="w-100">
                                    Số điện thoại khách
                                    <input
                                        required
                                        type="text"
                                        name="sdt"
                                        value={thongTinKhach.sdt}
                                        onChange={handleChangeCustomer}
                                        placeholder="Số điện thoại"
                                        className="w-100"
                                    />
                                </label>
                                <label className="w-100">
                                    Họ tên
                                    <input
                                        required
                                        type="text"
                                        name="hoTen"
                                        value={thongTinKhach.hoTen}
                                        onChange={handleChangeCustomer}
                                        placeholder="Họ tên"
                                        className="w-100"
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="w-100 ">
                                    Địa chỉ
                                    <input
                                        required
                                        type="text"
                                        name="diaChi"
                                        value={thongTinKhach.diaChi}
                                        onChange={handleChangeCustomer}
                                        placeholder="Địa chỉ"
                                        className="w-100"
                                    />
                                </label>
                            </div>
                        </Row>

                        {/* Products Selection */}
                        <Row className="sanPhamMua">
                            <h5 className="mt-2">Chọn sản phẩm mua</h5>
                            {sanPhamMuaDtoList.map((product, productIndex) => (
                                <div key={productIndex}>
                                    <label className="w-100">
                                        Tên sản phẩm
                                        <select
                                            required
                                            value={product.maSanPham || ''}
                                            onChange={(e) =>
                                                handleSanPhamChange(
                                                    productIndex,
                                                    e
                                                )
                                            }
                                            className="w-100"
                                        >
                                            <option value="">
                                                Chọn sản phẩm
                                            </option>
                                            {sanPhamData.data.map(
                                                (sp, index) => (
                                                    <option
                                                        key={`${sp.maSanPham}-${index}`}
                                                        value={sp.maSanPham}
                                                    >
                                                        {sp.ten}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </label>

                                    <div>
                                        {/* Single detail for each product */}
                                        <label className="w-100">
                                            Loại bao bì
                                            <select
                                                required
                                                value={
                                                    product.chiTietSanPhamReq
                                                        .maBaoBi || ''
                                                }
                                                onChange={(e) =>
                                                    handleDetailChange(
                                                        productIndex,
                                                        'maBaoBi',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-100"
                                            >
                                                <option value="">
                                                    Chọn loại bao bì
                                                </option>
                                                {Array.from(
                                                    new Set(
                                                        sanPhamData.data
                                                            .find(
                                                                (sp) =>
                                                                    sp.maSanPham ===
                                                                    parseInt(
                                                                        product.maSanPham,
                                                                        10
                                                                    )
                                                            )
                                                            ?.chiTietSanPhamResList.map(
                                                                (ct) =>
                                                                    ct.maBaoBi
                                                            )
                                                    )
                                                ).map((uniqueMaBaoBi) => {
                                                    const baoBiDetail =
                                                        sanPhamData.data
                                                            .find(
                                                                (sp) =>
                                                                    sp.maSanPham ===
                                                                    parseInt(
                                                                        product.maSanPham,
                                                                        10
                                                                    )
                                                            )
                                                            ?.chiTietSanPhamResList.find(
                                                                (ct) =>
                                                                    ct.maBaoBi ===
                                                                    uniqueMaBaoBi
                                                            );
                                                    return (
                                                        <option
                                                            key={uniqueMaBaoBi}
                                                            value={
                                                                uniqueMaBaoBi
                                                            }
                                                        >
                                                            {
                                                                baoBiDetail?.loaiBaoBi
                                                            }
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </label>

                                        <label className="w-100">
                                            Màu
                                            <select
                                                required
                                                value={
                                                    product.chiTietSanPhamReq
                                                        .maMau || ''
                                                }
                                                onChange={(e) =>
                                                    handleDetailChange(
                                                        productIndex,
                                                        'maMau',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-100"
                                            >
                                                <option value="">
                                                    Chọn màu
                                                </option>
                                                {Array.from(
                                                    new Set(
                                                        sanPhamData.data
                                                            .find(
                                                                (sp) =>
                                                                    sp.maSanPham ===
                                                                    parseInt(
                                                                        product.maSanPham,
                                                                        10
                                                                    )
                                                            )
                                                            ?.chiTietSanPhamResList.map(
                                                                (ct) => ct.maMau
                                                            )
                                                    )
                                                ).map((uniqueMaMau) => {
                                                    const mauDetail =
                                                        sanPhamData.data
                                                            .find(
                                                                (sp) =>
                                                                    sp.maSanPham ===
                                                                    parseInt(
                                                                        product.maSanPham,
                                                                        10
                                                                    )
                                                            )
                                                            ?.chiTietSanPhamResList.find(
                                                                (ct) =>
                                                                    ct.maMau ===
                                                                    uniqueMaMau
                                                            );
                                                    return (
                                                        <option
                                                            key={uniqueMaMau}
                                                            value={uniqueMaMau}
                                                        >
                                                            {mauDetail?.mau}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </label>

                                        <label className="w-100">
                                            Loại định mức lý thuyết
                                            <select
                                                required
                                                value={
                                                    product.chiTietSanPhamReq
                                                        .maLoaiDinhMucLyThuyet ||
                                                    ''
                                                }
                                                onChange={(e) =>
                                                    handleDetailChange(
                                                        productIndex,
                                                        'maLoaiDinhMucLyThuyet',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-100"
                                            >
                                                <option value="">
                                                    Chọn loại định mức
                                                </option>
                                                {Array.from(
                                                    new Set(
                                                        sanPhamData.data
                                                            .find(
                                                                (sp) =>
                                                                    sp.maSanPham ===
                                                                    parseInt(
                                                                        product.maSanPham,
                                                                        10
                                                                    )
                                                            )
                                                            ?.chiTietSanPhamResList.map(
                                                                (ct) =>
                                                                    ct.maDinhMucLyThuyet
                                                            )
                                                    )
                                                ).map(
                                                    (
                                                        uniqueMaDinhMucLyThuyet
                                                    ) => {
                                                        const dinhMucDetail =
                                                            sanPhamData.data
                                                                .find(
                                                                    (sp) =>
                                                                        sp.maSanPham ===
                                                                        parseInt(
                                                                            product.maSanPham,
                                                                            10
                                                                        )
                                                                )
                                                                ?.chiTietSanPhamResList.find(
                                                                    (ct) =>
                                                                        ct.maDinhMucLyThuyet ===
                                                                        uniqueMaDinhMucLyThuyet
                                                                );
                                                        return (
                                                            <option
                                                                key={
                                                                    uniqueMaDinhMucLyThuyet
                                                                }
                                                                value={
                                                                    uniqueMaDinhMucLyThuyet
                                                                }
                                                            >
                                                                {
                                                                    dinhMucDetail?.loaiDinhMucLyThuyet
                                                                }
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </label>
                                        <label className="w-100">
                                            Số lượng
                                            <input
                                                required
                                                type="number"
                                                min="1"
                                                value={
                                                    product.chiTietSanPhamReq
                                                        .soLuong || ''
                                                }
                                                onChange={(e) =>
                                                    handleDetailChange(
                                                        productIndex,
                                                        'soLuong',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Số lượng"
                                                className="w-100"
                                            />
                                        </label>
                                    </div>
                                    <Button
                                        className="mt-3"
                                        variant="danger"
                                        onClick={() =>
                                            handleRemoveProduct(productIndex)
                                        }
                                    >
                                        Xóa sản phẩm
                                    </Button>
                                    <hr />
                                </div>
                            ))}
                        </Row>
                        <Button variant="primary" onClick={handleAddProduct}>
                            Thêm sản phẩm
                        </Button>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                    <Button type="submit">Submit</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalExportForm;
