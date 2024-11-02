import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { setLoading, setSuccess } from "../redux/AppSlice"
import Loading from './Loading';

function Orders() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [donHangList, setDonHangList] = useState([]);
    const { profileActiveTab } = useSelector((state) => state.app);
    const [selectedDonHang, setSelectedDonHang] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [danhGia, setDanhGia] = useState('');
    const [rating, setRating] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const hasSubmittedReview = !!(selectedDonHang?.danhGia && selectedDonHang?.soSao);

    const handleLoadMore = () => {
        if (!hasMoreData) return;
        setIsLoadingMore(true);
        setPageNumber((prevPage) => prevPage + 1);
        fetchDonHangData(pageNumber + 1, true);
    };

    const handleShowModal = (donHang) => {
        setSelectedDonHang(donHang);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDanhGia('');
    };

    const handleDanhGia = async () => {
        try {
            const token = localStorage.getItem('token');
            const maSanPhamArray = selectedDonHang.sanPhamResDtos.map(sanPham => sanPham.maSanPham);
            const payload = {
                maSanPham: maSanPhamArray,
                maDonHang: selectedDonHang.maDonHang,
                soSao: rating,
                noiDung: danhGia
            }
            dispatch(setLoading(true))
            const response = await axios.post("http://localhost:8080/khachHang/danhGia", payload,
                { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Đánh giá thành công", { position: "top-right", autoClose: 3000 })
            setDonHangList((prevList) =>
                prevList.map((donHang) =>
                    donHang.maDonHang === selectedDonHang.maDonHang
                        ? { ...donHang, danhGia, soSao: rating }
                        : donHang
                )
            );
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        handleCloseModal();
    };

    const fetchDonHangData = async (page, reLoad) => {
        try {
            dispatch(setLoading(true));
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/donHang/xemChiTiet',
                {
                    params: {
                        pageNumber: page,
                        pageSize: 6
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            if (response.data.length < 6) {
                setHasMoreData(false); // No more data available
            }
            setDonHangList((prevList) => [...prevList, ...response.data]);
            dispatch(setSuccess(true));
        } catch (error) {
            console.error('Error fetching order data:', error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchDonHangData(pageNumber, false);
    }, [profileActiveTab, pageNumber, dispatch]);


    return (
        <Col xs={12} id="tab2" className="donHangContainer profilePageContent loading-container">
            <Loading />
            <h3 className='mb-3'>Các đơn hàng đã đặt mua</h3>
            {donHangList.map((donHang, index) => (
                <Row className='donHang' key={`${donHang.maDonHang}-${index}`}> {/* Using `thoiDiem` as a fallback key */}
                    <Row className="trangThaiDonHang mb-3 pe-0">
                        <Col className='d-flex justify-content-between'>
                            <span>Trạng thái đơn hàng: {donHang.trangThai}</span>
                            <span>Thời điểm mua: {new Date(donHang.thoiDiem).toLocaleString()}</span>
                        </Col>
                    </Row>
                    {donHang.sanPhamResDtos.map((sanPham, index) => (
                        <Row key={"sanPham" + index} className="thongTinDonHang align-items-center mb-4">
                            <Col className="anhSanPham" style={{ flex: '0 0 auto' }}>
                                <img
                                    src={sanPham.hinhAnh || "/images/winx.jpg"}
                                    alt="ảnh sản phẩm"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </Col>
                            <Col className="thongtinSanPhamContainer ms-2">
                                <Row>
                                    <Col xs={12} className="thongTinSanPham">
                                        <Row className="g-1">
                                            <Col id='nameAndType' className="spanContainer nameAndType d-flex justify-content-between">
                                                <span>Tên sản phẩm: {sanPham.ten}</span>
                                                <span>Phân loại: {sanPham.loai}</span>
                                            </Col>
                                        </Row>
                                        {sanPham.chiTietSanPhamResList.map((chiTiet, idx) => (
                                            <Row className="g-1" key={"ctsp" + idx}>
                                                <Col xl={8} md={12} className="d-flex flex-column spanContainer chiTiet">
                                                    <span>Loại bao bì: {chiTiet.loaiBaoBi}</span>
                                                    <span>Màu: {chiTiet.mau}</span>
                                                    <span>Loại định mức: {chiTiet.loaiDinhMucLyThuyet}</span>
                                                </Col>
                                                <Col
                                                    xl={4}
                                                    id='priceAndQuantity'
                                                    className="d-flex flex-column spanContainer priceAndQuantity text-end">
                                                    <span>Giá tiền: {chiTiet.giaTien.toLocaleString()} VND</span>
                                                    <span>Số lượng: {chiTiet.soLuong}</span>
                                                </Col>
                                            </Row>
                                        ))}
                                    </Col>
                                    <Col xs={12} className='muaLaiBtnCol'>
                                        <Button
                                            className='btn btn-priamry whiteBtn muaLaiBtn'
                                            onClick={() => navigate(`/productDetail/${sanPham.maSanPham}`)}
                                        >
                                            Mua lại
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ))}
                    <Row className="danhGia mt-3 d-flex justify-content-between align-items-center text-end">
                        <Col xs={10}>
                            <span>Tổng tiền: {donHang.tongTien.toLocaleString()} VND</span>
                        </Col>
                        <Col className='p-0'>
                            <Button
                                className={`btn ${donHang?.danhGia && donHang?.soSao ? 'priColor' : 'sndColor'} btn-primary danhGiaBtn`}
                                onClick={() => handleShowModal(donHang)}
                            >
                                {donHang?.danhGia && donHang?.soSao ? "Xem đánh giá" : " Đánh giá"}
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                </Row>
            ))}
            <div className="text-center mt-3">
                <Button className='btn sndColor' onClick={handleLoadMore} disabled={isLoadingMore}>
                    {isLoadingMore ? 'Đang tải...' : 'Xem thêm'}
                </Button>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {selectedDonHang && (
                        <>
                            <h5>Thời điểm: {new Date(selectedDonHang.thoiDiem).toLocaleString()}</h5>
                            <div className="sanPhamList mt-3">
                                {selectedDonHang.sanPhamResDtos.map((sanPham, idx) => (
                                    <Row key={"donHangDuocChon" + idx} className="mb-2 align-items-center">
                                        <Col xs={3}>
                                            <img
                                                src={sanPham.hinhAnh || '/images/winx.jpg'}
                                                alt="ảnh sản phẩm"
                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                            />
                                        </Col>
                                        <Col xs={9}>
                                            <span>{sanPham.ten}</span>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                            <div className="mt-3">
                                <h6>Chất lượng sản phẩm</h6>
                                <Rating
                                    initialRating={selectedDonHang.soSao || rating}
                                    onChange={(rate) => setRating(rate)}
                                    emptySymbol={<FaRegStar size={30} className="text-warning" />} // Empty star
                                    fullSymbol={<FaStar size={30} className="text-warning" />}
                                    readonly={hasSubmittedReview}
                                />
                            </div>
                            <Form.Group className="mt-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Để lại đánh giá"
                                    value={selectedDonHang.danhGia || danhGia}
                                    onChange={(e) => setDanhGia(e.target.value)}
                                    readOnly={hasSubmittedReview}
                                />
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={handleDanhGia}
                        disabled={!!(hasSubmittedReview)}
                    >
                        Gửi đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col >
    )
}

export default Orders