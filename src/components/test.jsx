import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';

function ModalExportForm({ show, onHide, onSubmit, sanPhamData }) {
    const [quantity, setQuantity] = useState({});
    const [thongTinKhach, setThongTinKhach] = useState({
        sdt: '',
        hoTen: '',
        diaChi: '',
    });
    const [sanPhamMuaDtoList, setSanPhamMuaDtoList] = useState([
        { maSanPham: '', chiTietSanPhamReq: { chiTietSanPham: '', soLuong: '' } },
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
                    chiTietSanPham: '',
                    soLuong: selectedProduct.soLuong,
                    giaTien: selectedProduct
                        ? selectedProduct.chiTietSanPhamResList[0].giaTien
                        : '',
                },
            };
            return updatedList;
        });
    };

    const handleDetailChange = (productIndex, value) => {
        // Find the selected product and its detailed item
        const selectedProduct = sanPhamMuaDtoList[productIndex];
        const selectedSanPham = sanPhamData.data.find(
            (sp) => sp.maSanPham === parseInt(selectedProduct.maSanPham, 10)
        );
        const selectedChiTiet = selectedSanPham?.chiTietSanPhamResList.find(
            (ct) => ct.maChiTietSanPham === value
        );
        console.log(selectedSanPham)

        // Update the state with selected chiTietSanPham, soLuong, and giaTien
        setSanPhamMuaDtoList((prevList) => {
            const updatedList = [...prevList];
            updatedList[productIndex].chiTietSanPhamReq = {
                ...updatedList[productIndex].chiTietSanPhamReq,
                chiTietSanPham: value,
                soLuong: selectedChiTiet ? selectedChiTiet.soLuong : 0, // Set soLuong if found
                giaTien: selectedChiTiet ? selectedChiTiet.giaTien : 0,  // Set giaTien if found
            };
            return updatedList;
        });
    };


    const handleAddProduct = () => {
        setSanPhamMuaDtoList([
            ...sanPhamMuaDtoList,
            { maSanPham: '', chiTietSanPhamReq: { chiTietSanPham: '', soLuong: '' } },
        ]);
    };

    const handleRemoveProduct = (index) => {
        setSanPhamMuaDtoList((prevList) => prevList.filter((_, i) => i !== index));
    };

    const handleChangeCustomer = (e) => {
        const { name, value } = e.target;
        setThongTinKhach((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ thongTinKhach, sanPhamMuaDtoList, lyDo });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            size="lg"
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
                                <label className="w-100">
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
                                <div key={`${productIndex}-${product.maSanPham}`}>
                                    <label className="w-100">
                                        Tên sản phẩm
                                        <select
                                            required
                                            value={product.maSanPham || ''}
                                            onChange={(e) => handleSanPhamChange(productIndex, e)}
                                            className="w-100"
                                        >
                                            <option value="">Chọn sản phẩm</option>
                                            {sanPhamData.data.map((sp, index) => (
                                                <option key={`${sp.maSanPham}-${index}`} value={sp.maSanPham}>
                                                    {sp.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <label className="w-100">
                                        Chọn chi tiết sản phẩm
                                        <select
                                            required
                                            value={product.chiTietSanPhamReq.chiTietSanPham || ''}
                                            onChange={(e) => handleDetailChange(productIndex, e.target.value)}
                                            className="w-100"
                                        >
                                            <option value="">Chọn chi tiết sản phẩm</option>
                                            {sanPhamData.data
                                                .find((sp) => sp.maSanPham === parseInt(product.maSanPham, 10))
                                                ?.chiTietSanPhamResList.map((ct, index) => (
                                                    <option key={`${ct.maChiTietSanPham}-${index}`} value={ct.maChiTietSanPham}>
                                                        {`${ct.loaiBaoBi} - ${ct.mau} - ${ct.loaiDinhMucLyThuyet}`}
                                                    </option>
                                                ))}
                                        </select>
                                    </label>

                                    <div className='d-flex align-item-center'>
                                        {/* <span className='d-flex me-4 priColorText w-50'>
                                            Số lượng trong kho:{' '}
                                            {product.chiTietSanPhamReq.soLuong || 0}
                                        </span> */}
                                        {/* <span className='d-flex me-4 priColorText w-50'>
                                            Số lượng trong kho:{' '}
                                            {selectedProductQuantities[`${productIndex}-${product.chiTietSanPhamReq.chiTietSanPham}`] || 0}
                                        </span> */}
                                        <label className="w-100">
                                            Số lượng xuất kho
                                            <input
                                                required
                                                type="number"
                                                min="1"
                                                value={product.chiTietSanPhamReq.soLuong || ''}
                                                onChange={(e) => handleDetailChange(productIndex, 'soLuong', e.target.value)}
                                                placeholder="Số lượng"
                                                className="w-100"
                                            />
                                        </label>
                                    </div>
                                    <Button
                                        className="mt-3"
                                        variant="danger"
                                        onClick={() => handleRemoveProduct(productIndex)}
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
