import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Form } from 'react-bootstrap';

function ModalImportForm({ show, onHide, onSubmit, sanPhamData }) {
    const [sanPhamMuaDtoList, setSanPhamMuaDtoList] = useState([
        {
            maSanPham: '',
            loaiBaoBi: '',
            mau: '',
            dinhMuc: '',
            giaTien: 0,
            soLuong: 0,
            nhaSanXuat: '',
            availableMau: [],
            availableDinhMuc: [],
        },
    ]);
    const [tongTien, setTongTien] = useState(0);

    // Load loaiBaoBi when maSanPham is selected
    const handleSanPhamChange = (productIndex, event) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        const maSanPham = event.target.value;
        const selectedProduct = sanPhamData?.data?.find(
            (sp) => sp.maSanPham === parseInt(maSanPham, 10)
        );
        //console.log(selectedProduct);

        newSanPhamMuaDtoList[productIndex] = {
            maSanPham,
            loaiBaoBi: '',
            mau: '',
            dinhMuc: '',
            giaTien: 0,
            soLuong: 0,
            nhaSanXuat: selectedProduct?.tenNhaSanXuat || '',
            availableMau: [],
            availableDinhMuc: [],
        };

        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };

    // Load mau when loaiBaoBi is selected
    const handleBaoBiChange = (productIndex, event) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        const selectedBaoBi = event.target.value;
        newSanPhamMuaDtoList[productIndex].loaiBaoBi = selectedBaoBi;
        newSanPhamMuaDtoList[productIndex].mau = '';
        newSanPhamMuaDtoList[productIndex].dinhMuc = '';

        // Update available colors based on selected baoBi
        const availableColors =
            sanPhamData.data
                .find(
                    (sp) =>
                        sp.maSanPham ===
                        parseInt(
                            newSanPhamMuaDtoList[productIndex].maSanPham,
                            10
                        )
                )
                ?.chiTietSanPhamResList.filter(
                    (ct) => ct.loaiBaoBi === selectedBaoBi
                )
                .map((ct) => ct.mau) || [];

        newSanPhamMuaDtoList[productIndex].availableMau = availableColors;
        newSanPhamMuaDtoList[productIndex].availableDinhMuc = []; // Reset dinhMuc when loaiBaoBi changes
        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };

    // Load dinhMuc when mau is selected
    const handleMauChange = (productIndex, event) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        const selectedMau = event.target.value;
        newSanPhamMuaDtoList[productIndex].mau = selectedMau;
        newSanPhamMuaDtoList[productIndex].dinhMuc = '';

        // Update available dinhMuc options based on selected mau
        const availableDinhMucOptions =
            sanPhamData.data
                .find(
                    (sp) =>
                        sp.maSanPham ===
                        parseInt(
                            newSanPhamMuaDtoList[productIndex].maSanPham,
                            10
                        )
                )
                ?.chiTietSanPhamResList.filter(
                    (ct) =>
                        ct.loaiBaoBi ===
                            newSanPhamMuaDtoList[productIndex].loaiBaoBi &&
                        ct.mau === selectedMau
                )
                .map((ct) => ct.loaiDinhMucLyThuyet) || [];

        newSanPhamMuaDtoList[productIndex].availableDinhMuc =
            availableDinhMucOptions;
        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };

    // Update selected dinhMuc and giaTien
    const handleDinhMucChange = (productIndex, event) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        const selectedDinhMuc = event.target.value;
        newSanPhamMuaDtoList[productIndex].dinhMuc = selectedDinhMuc;

        // Find giaTien for the selected loaiBaoBi, mau, and dinhMuc
        const selectedSanPham = sanPhamData.data.find(
            (sp) =>
                sp.maSanPham ===
                parseInt(newSanPhamMuaDtoList[productIndex].maSanPham, 10)
        );
        const matchingChiTiet = selectedSanPham?.chiTietSanPhamResList.find(
            (ct) =>
                ct.loaiBaoBi === newSanPhamMuaDtoList[productIndex].loaiBaoBi &&
                ct.mau === newSanPhamMuaDtoList[productIndex].mau &&
                ct.loaiDinhMucLyThuyet === selectedDinhMuc
        );

        // if (matchingChiTiet) {
        //     newSanPhamMuaDtoList[productIndex].giaTien =
        //         matchingChiTiet.giaTien;
        // } else {
        //     newSanPhamMuaDtoList[productIndex].giaTien = 0; // Reset if no match found
        // }

        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };
    const handleChangeCustomer = (e) => {
        const { name, value } = e.target;
        setThongTinKhach((prev) => ({ ...prev, [name]: value }));
    };

    const handleRemoveProduct = (index) => {
        const newSanPhamMuaDtoList = sanPhamMuaDtoList.filter(
            (_, i) => i !== index
        );
        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
        calculateTongTien(newSanPhamMuaDtoList);
    };

    const handleAddProduct = () => {
        setSanPhamMuaDtoList([
            ...sanPhamMuaDtoList,
            {
                maSanPham: '',
                loaiBaoBi: '',
                mau: '',
                dinhMuc: '',
                giaTien: 0,
                soLuong: 1,
                nhaSanXuat: '',
                availableMau: [],
                availableDinhMuc: [],
            },
        ]);
    };

    const handleQuantityChange = (productIndex, quantity) => {
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        newSanPhamMuaDtoList[productIndex].soLuong = quantity;
        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
        calculateTongTien(newSanPhamMuaDtoList);
    };

    const handleMoneyChange = (productIndex, quantity) => {
        const formattedValue = quantity.replace(/[^\d]/g, '');
        const newSanPhamMuaDtoList = [...sanPhamMuaDtoList];
        newSanPhamMuaDtoList[productIndex].giaTien =
            parseInt(formattedValue, 10) || 0;
        setSanPhamMuaDtoList(newSanPhamMuaDtoList);
    };

    const calculateTongTien = (sanPhamMuaDtoList) => {
        const total = sanPhamMuaDtoList.reduce((sum, product) => {
            return sum + product.giaTien * product.soLuong;
        }, 0);
        setTongTien(total);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(sanPhamMuaDtoList);
        console.log('Tong tien: ', tongTien);
        onSubmit(sanPhamMuaDtoList);
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
            <Modal.Header closeButton>
                <Modal.Title>Nhập hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body className="addPhieuXuatForm">
                <Col>
                    <Row className="sanPhamMua">
                        <h5 className="mt-2">Chọn sản phẩm nhập</h5>
                        {sanPhamMuaDtoList?.map((product, productIndex) => (
                            <div key={productIndex}>
                                <label className="w-100">
                                    Tên sản phẩm
                                    <select
                                        required
                                        value={product.maSanPham || ''}
                                        onChange={(e) =>
                                            handleSanPhamChange(productIndex, e)
                                        }
                                        className="w-100"
                                    >
                                        <option value="">Chọn sản phẩm</option>
                                        {sanPhamData?.data?.map((sp) => (
                                            <option
                                                key={sp.maSanPham}
                                                value={sp.maSanPham}
                                            >
                                                {sp.ten}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="w-100">
                                    Loại bao bì
                                    <select
                                        required
                                        value={product.loaiBaoBi || ''}
                                        onChange={(e) =>
                                            handleBaoBiChange(productIndex, e)
                                        }
                                        className="w-100"
                                    >
                                        <option value="">Chọn bao bì</option>
                                        {/* Load available loaiBaoBi based on selected maSanPham */}
                                        {[
                                            ...new Set(
                                                sanPhamData?.data
                                                    ?.find(
                                                        (sp) =>
                                                            sp.maSanPham ===
                                                            parseInt(
                                                                product.maSanPham,
                                                                10
                                                            )
                                                    )
                                                    ?.chiTietSanPhamResList.map(
                                                        (ct) => ct.loaiBaoBi
                                                    )
                                            ),
                                        ].map((loaiBaoBi) => (
                                            <option
                                                key={loaiBaoBi}
                                                value={loaiBaoBi}
                                            >
                                                {loaiBaoBi}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="w-100">
                                    Màu
                                    <select
                                        required
                                        value={product.mau || ''}
                                        onChange={(e) =>
                                            handleMauChange(productIndex, e)
                                        }
                                        className="w-100"
                                    >
                                        <option value="">Chọn màu</option>
                                        {product?.availableMau?.map((mau) => (
                                            <option key={mau} value={mau}>
                                                {mau}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="w-100">
                                    Định mức
                                    <select
                                        required
                                        value={product.dinhMuc || ''}
                                        onChange={(e) =>
                                            handleDinhMucChange(productIndex, e)
                                        }
                                        className="w-100"
                                    >
                                        <option value="">Chọn định mức</option>
                                        {product?.availableDinhMuc?.map(
                                            (dinhMuc) => (
                                                <option
                                                    key={dinhMuc}
                                                    value={dinhMuc}
                                                >
                                                    {dinhMuc}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </label>
                                <label className="w-100">
                                    Nhà sản xuất
                                    <input
                                        type="text"
                                        name={`nhaSanXuat_${productIndex}`}
                                        placeholder="Nhà sản xuất"
                                        value={product?.nhaSanXuat || ''} // Giá trị nhà sản xuất
                                        readOnly
                                        className="w-100"
                                    />
                                </label>

                                <label className="w-100">
                                    Giá Nhập
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            required
                                            type="text" // Giữ type là text để có thể xử lý định dạng
                                            min="1"
                                            value={
                                                product.giaTien === null
                                                    ? ''
                                                    : new Intl.NumberFormat().format(
                                                          product.giaTien
                                                      )
                                            } // Định dạng giá trị hiển thị
                                            onChange={(e) =>
                                                handleMoneyChange(
                                                    productIndex,
                                                    e.target.value
                                                )
                                            } // Gọi hàm khi thay đổi
                                            className="w-100"
                                            style={{
                                                paddingRight: '40px', // Tạo khoảng trống để chữ "VND" không đè lên
                                            }}
                                        />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                pointerEvents: 'none', // Không ảnh hưởng đến việc nhập liệu
                                                color: '#999', // Màu chữ VND cho rõ ràng hơn
                                            }}
                                        >
                                            VND
                                        </span>
                                    </div>
                                </label>

                                <label className="w-100">
                                    Số lượng
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        value={product.soLuong}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                productIndex,
                                                e.target.value
                                            )
                                        }
                                        className="w-100"
                                    />
                                </label>

                                {/* <Button
                                    className="mt-3"
                                    variant="danger"
                                    onClick={() =>
                                        handleRemoveProduct(productIndex)
                                    }
                                >
                                    Xóa sản phẩm
                                </Button> */}
                                <hr />
                            </div>
                        ))}
                    </Row>

                    {/* <Button variant="primary" onClick={handleAddProduct}>
                        Thêm sản phẩm
                    </Button> */}
                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Đóng</Button>
                <Button type="submit" onClick={handleSubmit}>
                    Nhập hàng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalImportForm;
