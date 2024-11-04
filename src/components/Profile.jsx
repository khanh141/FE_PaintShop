import { Row, Col, Button, } from 'react-bootstrap'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setProfile } from "../redux/UserSlice"
import { setLoading, setSuccess, resetStatus, setProfileActiveTab } from "../redux/AppSlice"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';


function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSdt, setShowSdt] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const { profileActiveTab } = useSelector((state) => state.app);
    const [isEditing, setIsEditing] = useState(false);

    const {
        tenDangNhap, hoTen, quyen, soDienThoai, email, diaChi, maNhanVien
    } = useSelector((store) => store.user)
    const [formData, setFormData] = useState({
        hoTen, email, soDienThoai, diaChi, maNhanVien,
    });

    useEffect(() => {
        setFormData({
            hoTen: hoTen || '',
            email: email || '',
            soDienThoai: soDienThoai || '',
            diaChi: diaChi || '',
            maNhanVien: maNhanVien || '',
        });
    }, [hoTen, email, soDienThoai, diaChi, maNhanVien]);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [profileActiveTab]);

    const capNhatTaiKhoan = async (data) => {

        const currentSDT = formData.soDienThoai || "";
        const currentDiaChi = formData.diaChi || "";
        let newDiaChiHoacSDT = "";
        if (diaChi) {
            newDiaChiHoacSDT = currentDiaChi
        } else if (diaChi === "") {
            newDiaChiHoacSDT = currentSDT || "";
        }

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

            if (data.diaChi) {
                payload.diaChiHoacSDT = data.diaChi;
            } else {
                payload.diaChiHoacSDT = data.soDienThoai;
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
                diaChiHoacSDT: userDataFromBackend.diaChi || userDataFromBackend.soDienThoai,
            };

            if (diaChi) {
                dispatch(setProfile(
                    updatedData.hoTen,
                    soDienThoai,
                    email,
                    updatedData.diaChiHoacSDT));
            }
            dispatch(setSuccess(true));
        } catch (error) {
            dispatch(setLoading(false));
            toast.error('Có lỗi xảy ra!');
            console.error('Error updating account:', error);
        }
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                dispatch(setLoading(true));
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/taiKhoan/trangCaNhan', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.khachHangResDto;
                const profileData = {
                    hoTen: data.hoTen,
                    soDienThoai: data.soDienThoai || '',
                    email: data.email,
                    diaChi: data.diaChi || '',
                    maNhanVien: data.maNhanVien || '',
                };

                dispatch(
                    setProfile(
                        profileData.hoTen,
                        profileData.soDienThoai,
                        profileData.email,
                        profileData.diaChi,
                        profileData.maNhanVien
                    )
                );

                setProfileActiveTab('1');
                dispatch(setSuccess(true));
            } catch (error) {
                console.error('Error fetching profile data:', error);
                navigate('/Login');
            }
        };

        fetchProfileData();
    }, [dispatch, setProfileActiveTab, navigate]);

    return (
        <Col xs={12} className="bg-light profilePageContent profileContainer loading-container">
            <Loading />
            <div id='tab1'>
                <h3 className='mb-3'>Hồ sơ của tôi</h3>
                <Row id='tenDangNhap'>
                    <Col sm={4} xs={5} style={{ flex: '0 0 30%' }} className="info">
                        <span>Tên đăng nhập</span>
                    </Col>
                    <Col sm={8} xs={7}>
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
                    <Col sm={4} xs={5} style={{ flex: '0 0 30%' }} className="info">
                        <span>Tên</span>
                    </Col>
                    <Col sm={8} xs={7}>
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
                    <Col sm={4} xs={5} style={{ flex: '0 0 30%' }} className="info">
                        <span>Số điện thoại</span>
                    </Col>
                    <Col sm={8} xs={7} className="position-relative">
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
                    <Col sm={4} xs={5} style={{ flex: '0 0 30%' }} className="info">
                        <span>Email</span>
                    </Col>
                    <Col sm={8} xs={7} style={{ position: 'relative' }}>
                        <input
                            type={showEmail ? "text" : "password"}
                            name="email"
                            placeholder="Email"
                            value={email}
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
                        <Col sm={4} xs={5} style={{ flex: '0 0 30%' }} className="info">
                            <span>Địa chỉ</span>
                        </Col>
                        <Col sm={8} xs={7}>
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
                        <Col sm={4} xs={5} style={{ flex: '0 0 30%' }} className="info">
                            <span>Mã nhân viên</span>
                        </Col>
                        <Col sm={8} xs={7}>
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
                    <Col sm={4} xs={5} style={{ flex: '0 0 30%' }} className="info">
                        <span>Loại tài khoản</span>
                    </Col>
                    <Col sm={8} xs={7}>
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
                    <Col sm={4} xs={5} style={{ flex: '0 0 30%' }} className="info">
                        {isEditing && (
                            <Button
                                style={{ minWidth: '100px' }}
                                className='w100 sndColor btn'
                                onClick={cancelEdit}>
                                Hủy
                            </Button>
                        )}
                    </Col>
                    <Col>
                        <Button
                            style={{ minWidth: '100px' }}
                            className="btn priColor"
                            variant="primary"
                            onClick={isEditing ? handleSave : handleEdit}
                        >
                            {isEditing ? 'Lưu' : 'Chỉnh sửa thông tin'}
                        </Button>
                    </Col>
                </Row>
            </div>
        </Col >
    )
}

export default Profile