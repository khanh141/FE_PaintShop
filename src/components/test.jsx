import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';

function ModalExportForm({ show, onHide, onSubmit, sanPhamData }) {
    const [thongTinKhach, setThongTinKhach] = useState({
        sdt: '',
        hoTen: '',
        diaChi: '',
    });
    const [sanPhamMuaDtoList, setSanPhamMuaDtoList] = useState([{ maSanPham: '', chiTietSanPhamReq: { loaiBaoBi: '', mau: '', dinhMuc: '', giaTien: 0, soLuong: 1 } }]);
    const [tongTien, setTongTien] = useState(0);
    const [availableMau, setAvailableMau] = useState([]);
    const [availableDinhMuc, setAvailableDinhMuc] = useState([]);

    // Load loaiBaoBi when maSanPham is selected
    const handleSanPhamChange = (productIndex, event) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        const maSanPham = event.target.value;
        newSanPhamMuaDtoList[productIndex].maSanPham = maSanPham;
        newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq = { loaiBaoBi: '', mau: '', dinhMuc: '', giaTien: 0, soLuong: 1 };

        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };

    // Load mau when loaiBaoBi is selected
    const handleBaoBiChange = (productIndex, event) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        const selectedBaoBi = event.target.value;
        newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.loaiBaoBi = selectedBaoBi;
        newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.mau = '';
        newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.dinhMuc = '';

        // Update available colors based on selected baoBi
        const availableColors = sanPhamData.data
            .find(sp => sp.maSanPham === parseInt(newSanPhamMuaDtoList[productIndex].maSanPham, 10))
            ?.chiTietSanPhamResList
            .filter(ct => ct.loaiBaoBi === selectedBaoBi)
            .map(ct => ct.mau) || [];

        setAvailableMau(availableColors);
        setAvailableDinhMuc([]); // Reset dinhMuc when loaiBaoBi changes
        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };

    // Load dinhMuc when mau is selected
    const handleMauChange = (productIndex, event) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        const selectedMau = event.target.value;
        newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.mau = selectedMau;
        newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.dinhMuc = '';

        // Update available dinhMuc options based on selected mau
        const availableDinhMucOptions = sanPhamData.data
            .find(sp => sp.maSanPham === parseInt(newSanPhamMuaDtoList[productIndex].maSanPham, 10))
            ?.chiTietSanPhamResList
            .filter(ct => ct.loaiBaoBi === newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.loaiBaoBi && ct.mau === selectedMau)
            .map(ct => ct.loaiDinhMucLyThuyet) || [];

        setAvailableDinhMuc(availableDinhMucOptions);
        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };

    // Update selected dinhMuc
    // Update selected dinhMuc and giaTien
    const handleDinhMucChange = (productIndex, event) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        const selectedDinhMuc = event.target.value;
        newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.dinhMuc = selectedDinhMuc;

        // Find giaTien for the selected loaiBaoBi, mau, and dinhMuc
        const selectedSanPham = sanPhamData.data.find(sp => sp.maSanPham === parseInt(newSanPhamMuaDtoList[productIndex].maSanPham, 10));
        const matchingChiTiet = selectedSanPham?.chiTietSanPhamResList.find(ct =>
            ct.loaiBaoBi === newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.loaiBaoBi &&
            ct.mau === newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.mau &&
            ct.loaiDinhMucLyThuyet === selectedDinhMuc
        );

        if (matchingChiTiet) {
            newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.giaTien = matchingChiTiet.giaTien;
        } else {
            newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.giaTien = 0; // Reset if no match found
        }

        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };

    const handleChangeCustomer = (e) => {
        const { name, value } = e.target;
        setThongTinKhach((prev) => ({ ...prev, [name]: value }));
    };
    const handleRemoveProduct = (index) => {
        const newSanPhamMuaDtoList = sanPhamMuaDtoList.filter((_, i) => i !== index);
        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };
    const handleAddProduct = () => {
        setSanPhamMuaDtoList([...sanPhamMuaDtoList, { maSanPham: '', chiTietSanPhamReq: { loaiBaoBi: '', mau: '', dinhMuc: '', soLuong: 1 } }]);
    };

    const handleQuantityChange = (productIndex, quantity) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.soLuong = quantity;
        let giaTienSanPham = newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.giaTien * newSanPhamMuaDtoList[productIndex].chiTietSanPhamReq.soLuong;
        setTongTien(tongTien + giaTienSanPham);
        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(sanPhamMuaDtoList)
        console.log("Tong tien: ", tongTien)
        // onSubmit({ thongTinKhach, sanPhamMuaDtoList });
    }
    // Render Modal
    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            size="lg"
            centered
        >
            <form onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm phiếu xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body className="addPhieuXuatForm">
                    <Col>
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
                        <Row className="sanPhamMua">
                            <h5 className="mt-2">Chọn sản phẩm mua</h5>
                            {sanPhamMuaDtoList.map((product, productIndex) => (
                                <div key={productIndex}>
                                    <label className="w-100">
                                        Tên sản phẩm
                                        <select
                                            required
                                            value={product.maSanPham || ''}
                                            onChange={(e) => handleSanPhamChange(productIndex, e)}
                                            className="w-100"
                                        >
                                            <option value="">Chọn sản phẩm</option>
                                            {sanPhamData.data.map(sp => (
                                                <option key={sp.maSanPham} value={sp.maSanPham}>{sp.ten}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="w-100">
                                        Loại bao bì
                                        <select
                                            required
                                            value={product.chiTietSanPhamReq.loaiBaoBi || ''}
                                            onChange={(e) => handleBaoBiChange(productIndex, e)}
                                            className="w-100"
                                        >
                                            <option value="">Chọn bao bì</option>
                                            {/* Load available loaiBaoBi based on selected maSanPham */}
                                            {sanPhamData.data
                                                .find(sp => sp.maSanPham === parseInt(product.maSanPham, 10))
                                                ?.chiTietSanPhamResList
                                                .map(ct => (
                                                    <option key={ct.loaiBaoBi} value={ct.loaiBaoBi}>{ct.loaiBaoBi}</option>
                                                ))}
                                        </select>
                                    </label>
                                    <label className="w-100">
                                        Màu
                                        <select
                                            required
                                            value={product.chiTietSanPhamReq.mau || ''}
                                            onChange={(e) => handleMauChange(productIndex, e)}
                                            className="w-100"
                                        >
                                            <option value="">Chọn màu</option>
                                            {availableMau.map(mau => (
                                                <option key={mau} value={mau}>{mau}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="w-100">
                                        Định mức
                                        <select
                                            required
                                            value={product.chiTietSanPhamReq.dinhMuc || ''}
                                            onChange={(e) => handleDinhMucChange(productIndex, e)}
                                            className="w-100"
                                        >
                                            <option value="">Chọn định mức</option>
                                            {availableDinhMuc.map(dinhMuc => (
                                                <option key={dinhMuc} value={dinhMuc}>{dinhMuc}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="w-100">
                                        Số lượng
                                        <input
                                            required
                                            type="number"
                                            min="1"
                                            value={product.chiTietSanPhamReq.soLuong}
                                            onChange={(e) => handleQuantityChange(productIndex, e.target.value)}
                                            className="w-100"
                                        />
                                    </label>

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
                        {/* <Button variant="primary" onClick={() => setSanPhamMuaDtoList([...sanPhamMuaDtoList, { maSanPham: '', chiTietSanPhamReq: { loaiBaoBi: '', mau: '', dinhMuc: '', soLuong: 1 } }])}> */}
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