import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import { CgProfile } from "react-icons/cg";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, setUser } from "../redux/UserSlice"
import { setLoading, setSuccess, resetStatus, setProfileActiveTab } from "../redux/AppSlice"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [donHangList, setDonHangList] = useState([]);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showSdt, setShowSdt] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDonHang, setSelectedDonHang] = useState(null);
    const [danhGia, setDanhGia] = useState('');
    const [rating, setRating] = useState(0);

    const hasSubmittedReview = !!(selectedDonHang?.danhGia && selectedDonHang?.soSao);
    const { isLoading, isSuccess, profileActiveTab } = useSelector((state) => state.app);
    const {
        tenDangNhap, hoTen, quyen, soDienThoai, email, diaChi, maNhanVien
    } = useSelector((store) => store.user)
    const [formData, setFormData] = useState({
        hoTen, email, soDienThoai, diaChi, maNhanVien,
    });
    useEffect(() => {
        setFormData({ hoTen, email, soDienThoai, diaChi, maNhanVien });
    }, [hoTen, email, soDienThoai, diaChi, maNhanVien]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [profileActiveTab]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Thành công!', { position: "top-right", autoClose: 3000 });
            const timer = setTimeout(() => {
                dispatch(resetStatus());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/taiKhoan/trangCaNhan', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data.khachHangResDto;

                const profileData = {
                    hoTen: data.hoTen,
                    soDienThoai: data.soDienThoai || '',
                    email: data.email,
                    diaChi: data.diaChi || '',
                    maNhanVien: data.maNhanVien || ''
                };
                dispatch(setProfileActiveTab('1'))
                dispatch(setProfile(profileData.hoTen, profileData.soDienThoai, profileData.email, profileData.diaChi, profileData.maNhanVien));
            } catch (error) {
                console.error('Error fetching profile data:', error);
                navigate("/Login");
            }
        };

        const fetchDonHangData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/donHang/xemChiTiet', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (Array.isArray(response.data)) {
                    setDonHangList(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setDonHangList([]);
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };
        if (profileActiveTab === '1') {
            fetchProfileData()
        } else if (profileActiveTab === '2') {
            fetchDonHangData()
        }
    }, [profileActiveTab, dispatch]);

    const handlePasswordChange = async () => {
        try {
            dispatch(setLoading(true));
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                'http://localhost:8080/taiKhoan/doiMatKhau',
                { tenDangNhap, matKhauCu: oldPassword, matKhauMoi: newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            localStorage.setItem('token', response.data.token);
            dispatch(setSuccess(true))
            navigate('/profile');
        } catch (error) {
            setErrors(error.response.data)
        }
    };
    const capNhatTaiKhoan = async (data) => {

        const currentSDT = soDienThoai || "";
        const currentDiaChi = diaChi || "";
        const newDiaChiHoacSDT = data.soDienThoai || data.diaChi || "";

        if (data.hoTen === hoTen && newDiaChiHoacSDT === (currentSDT || currentDiaChi)) {
            toast.error("Không có thay đổi về thông tin")
            return;
        }
        try {
            dispatch(setLoading(true));
            const payload = {
                tenDangNhap,
                hoTen: data.hoTen,
            };

            if (data.soDienThoai) {
                payload.diaChiHoacSDT = data.soDienThoai;
            } else if (data.diaChi) {
                payload.diaChiHoacSDT = data.diaChi;
            }

            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:8080/taiKhoan/capNhatThongTin',
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const userDataFromBackend = response.data;
            const updatedData = {
                ...userDataFromBackend,
                hoTen: userDataFromBackend.hoTen || '',
                diaChiHoacSDT: userDataFromBackend.soDienThoai || userDataFromBackend.diaChi,
            };

            console.log(updatedData)
            dispatch(setProfile(updatedData.hoTen, updatedData.diaChiHoacSDT));
            dispatch(setSuccess(true));
        } catch (error) {
            dispatch(setLoading(false));
            toast.error('Có lỗi xảy ra!');
            console.error('Error updating account:', error);
        }
    };
    const handleShowModal = (donHang) => {
        setSelectedDonHang(donHang); // Store the selected donHang
        setShowModal(true); // Open the modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
        setDanhGia(''); // Reset input
    };

    const handleDanhGia = async () => {
        try {
            const token = localStorage.getItem('token');
            const payload = {
                maDonHang: selectedDonHang.maDonHang,
                soSao: rating,
                noiDung: danhGia
            }
            dispatch(setLoading(true))
            const response = await axios.post("http://localhost:8080/khachHang/danhGia", payload,
                { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Đánh giá thành công", { position: "top-right", autoClose: 3000 })
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        handleCloseModal();
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, }));
    };
    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleSave = () => {
        capNhatTaiKhoan(formData);
        setIsEditing(false);
    };
    const cancelEdit = () => {
        setIsEditing(false);
    }

    const renderTabContent = () => {
        switch (profileActiveTab) {
            case '1':
                return (
                    <Col xs={10} className="bg-light content">
                        <div id='tab1'>
                            <h3 className='mb-3'>Hồ sơ của tôi</h3>
                            <Row id='tenDangNhap'>
                                <Col style={{ flex: '0 0 30%' }} className="text-end">
                                    <span>Tên đăng nhập</span>
                                </Col>
                                <Col>
                                    <input
                                        type="text"
                                        placeholder="Tên đăng nhập"
                                        value={tenDangNhap}
                                        disabled
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row id='ten'>
                                <Col style={{ flex: '0 0 30%' }} className="text-end">
                                    <span>Tên</span>
                                </Col>
                                <Col>
                                    <input
                                        type="text"
                                        name="hoTen"
                                        placeholder="Tên"
                                        value={formData.hoTen}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row id='soDienThoai'>
                                <Col style={{ flex: '0 0 30%' }} className="text-end">
                                    <span>Số điện thoại</span>
                                </Col>
                                <Col className="position-relative">
                                    <input
                                        type={showSdt ? "text" : "password"}
                                        name="soDienThoai"
                                        placeholder="Số điện thoại"
                                        value={formData.soDienThoai || ""}
                                        disabled={!isEditing || !!diaChi}
                                        className="form-control"
                                        onChange={handleInputChange}
                                    />
                                    <FontAwesomeIcon
                                        icon={showSdt ? faEyeSlash : faEye}
                                        className="position-absolute top-50 translate-middle-y end-0 pe-4 cursor-pointer"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setShowSdt(!showSdt)}
                                    />
                                </Col>

                            </Row>
                            <Row id='email' className="align-items-center">
                                <Col style={{ flex: '0 0 30%' }} className="text-end">
                                    <span>Email</span>
                                </Col>
                                <Col style={{ position: 'relative' }}>
                                    <input
                                        type={showEmail ? "text" : "password"}
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled
                                        className="form-control"
                                        style={{ paddingRight: '40px' }}
                                    />
                                    <FontAwesomeIcon
                                        icon={showEmail ? faEyeSlash : faEye}
                                        className="position-absolute top-50 translate-middle-y end-0 pe-4 cursor-pointer"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setShowEmail(!showEmail)}
                                    />
                                </Col>
                            </Row>
                            {diaChi ? (
                                <Row id='diaChi'>
                                    <Col style={{ flex: '0 0 30%' }} className="text-end">
                                        <span>Địa chỉ</span>
                                    </Col>
                                    <Col>
                                        <input
                                            type="text"
                                            name="diaChi"
                                            placeholder="Địa chỉ"
                                            value={formData.diaChi}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                            ) : maNhanVien ? (
                                <Row id='maNhanVien'>
                                    <Col style={{ flex: '0 0 30%' }} className="text-end">
                                        <span>Mã nhân viên</span>
                                    </Col>
                                    <Col>
                                        <input
                                            type="text"
                                            name="maNhanVien"
                                            placeholder="Mã nhân viên"
                                            value={formData.maNhanVien}
                                            onChange={handleInputChange}
                                            disabled
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                            ) : null}
                            <Row id='quyen'>
                                <Col style={{ flex: '0 0 30%' }} className="text-end">
                                    <span>Loại tài khoản</span>
                                </Col>
                                <Col>
                                    <input
                                        type="text"
                                        placeholder="Loại tài khoản"
                                        value={quyen === "nhanVien" ? "Nhân viên" : "Khách hàng"}
                                        disabled
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row id="btnGrp" className="align-items-center">
                                <Col style={{ flex: '0 0 30%' }} className="text-end">
                                    {isEditing && (
                                        <Button
                                            style={{ minWidth: '100px' }}
                                            className='w100 priColor btn'
                                            onClick={cancelEdit}>
                                            Hủy
                                        </Button>
                                    )}
                                </Col>
                                <Col>
                                    <Button
                                        style={{ minWidth: '100px' }}
                                        className="btn sndColor"
                                        variant="primary"
                                        onClick={isEditing ? handleSave : handleEdit}
                                    >
                                        {isEditing ? 'Lưu' : 'Chỉnh sửa thông tin'}
                                    </Button>

                                </Col>
                            </Row>

                        </div>
                    </Col >
                );
            case '2': return (
                <Col id="tab2" className="donHangContainer">
                    {donHangList.map((donHang) => (
                        <div key={donHang.thoiDiem}> {/* Using `thoiDiem` as a fallback key */}
                            <Row className="trangThaiDonHang mb-3">
                                <span>Trạng thái đơn hàng: {donHang.trangThai}</span>
                                <span>Thời điểm: {new Date(donHang.thoiDiem).toLocaleString()}</span>
                            </Row>
                            {donHang.sanPhamResDtos.map((sanPham, index) => (
                                <Row key={index} className="thongTinDonHang align-items-center mb-4">
                                    <Col className="anhSanPham" style={{ flex: '0 0 auto' }}>
                                        <img
                                            src={sanPham.hinhAnh || "/images/winx.jpg"}
                                            alt="ảnh sản phẩm"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    </Col>
                                    <Col className="thongtinSanPhamContainer ms-2">
                                        <Row>
                                            <Col xs={10} className="thongTinSanPham">
                                                <Row className="g-1">
                                                    <Col className="spanContainer">
                                                        <span>{sanPham.ten}</span>
                                                        <span>{sanPham.loai}</span>
                                                    </Col>
                                                </Row>
                                                {sanPham.chiTietSanPhamResList.map((chiTiet, idx) => (
                                                    <Row className="g-1" key={idx}>
                                                        <Col className="spanContainer" xs={8}>
                                                            <span>Loại bao bì: {chiTiet.loaiBaoBi}</span>
                                                            <span>Màu: {chiTiet.mau}</span>
                                                            <span>Loại định mức: {chiTiet.loaiDinhMucLyThuyet}</span>
                                                        </Col>
                                                        <Col xs={4} className="text-end">
                                                            <span className="d-block">Giá tiền: {chiTiet.giaTien.toLocaleString()} VND</span>
                                                            <span className="d-block">Số lượng: {chiTiet.soLuong}</span>
                                                        </Col>
                                                    </Row>
                                                ))}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Button
                                        className='btn btn-priamry sndColor'
                                        onClick={() => navigate(`/productDetail/${sanPham.maSanPham}`)}
                                    >
                                        Mua lại
                                    </Button>
                                </Row>
                            ))}
                            <Row className="danhGia mt-3 d-flex justify-content-between align-items-center">
                                <span>Tổng tiền: {donHang.tongTien.toLocaleString()} VND</span>
                                <Button
                                    className={`btn ${donHang?.danhGia && donHang?.soSao ? 'priColor' : 'sndColor'} btn-primary`}
                                    onClick={() => handleShowModal(donHang)}
                                >
                                    {donHang?.danhGia && donHang?.soSao ? "Xem đánh giá" : " Đánh giá"}
                                </Button>
                            </Row>
                            <hr />
                        </div>
                    ))}
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
                                            <Row key={idx} className="mb-2 align-items-center">
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
                                            readonly={hasSubmittedReview}
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
            );
            case '3':
                return (
                    <div id='tab3' style={{ height: '7 0vh' }} className='content doiMatKhau'>
                        <h3 className='mb-3'>Đổi mật khẩu</h3>
                        <div className="position-relative mb-4 inputContainer"  >
                            <Form.Control type="text" style={{ display: 'none' }} autoComplete="username" />
                            <Form.Control type="password" style={{ display: 'none' }} autoComplete="new-password" />
                            <FloatingLabel label="Mật khẩu cũ">
                                <Form.Control
                                    type={showOldPassword ? 'text' : 'password'}
                                    placeholder="Mật khẩu cũ"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </FloatingLabel>
                            <FontAwesomeIcon
                                icon={showOldPassword ? faEyeSlash : faEye}
                                className="position-absolute top-50 translate-middle-y end-0 pe-3 cursor-pointer"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            />
                        </div>
                        <div className="position-relative mb-4 inputContainer">
                            <FloatingLabel label="Mật khẩu mới">
                                <Form.Control
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="Mật khẩu mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </FloatingLabel>
                            <FontAwesomeIcon
                                icon={showNewPassword ? faEyeSlash : faEye}
                                className="position-absolute top-50 translate-middle-y end-0 pe-3 cursor-pointer"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            />
                        </div>
                        {errors && <Alert className='mt-1' variant="danger">{errors}</Alert>}
                        <Button
                            variant="primary"
                            className="me-2 sndColor"
                            onClick={handlePasswordChange}
                        >
                            Đổi mật khẩu
                        </Button>
                    </div>)
            case '4':
                return <p>yêu cầu xóa tài khoản</p>;
            default:
                return <p>Select a tab to view content.</p>;
        }
    };
    return (
        <Container className='profilePage'>
            <Row className="h-100 mt-4">
                <Col xs={2} className="text-white p-3 sideBar pt-4">
                    <div className="profile">
                        <CgProfile />
                        <span className='ms-2'>{tenDangNhap}</span>
                    </div>
                    <ul className="sideBarList ps-1">
                        <li
                            className={profileActiveTab === '1' ? 'active' : ''}
                            onClick={() => dispatch(setProfileActiveTab('1'))}
                        >
                            Hồ sơ
                        </li>
                        <li
                            className={profileActiveTab === '2' ? 'active' : ''}
                            onClick={() => dispatch(setProfileActiveTab('2'))}
                        >
                            Đơn mua
                        </li>
                        <li
                            className={profileActiveTab === '3' ? 'active' : ''}
                            onClick={() => dispatch(setProfileActiveTab('3'))}
                        >
                            Đổi mật khẩu
                        </li>
                        <li
                            className={profileActiveTab === '4' ? 'active' : ''}
                            onClick={() => dispatch(setProfileActiveTab('4'))}
                        >
                            Thiết lập khác
                        </li>
                    </ul>

                </Col>

                <Col xs={10} className="bg-light p-4 contentContainer">
                    {renderTabContent()}
                </Col>
            </Row>
            {isLoading && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="loading">Loading...</div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </Container>
    )
}

export default ProfilePage