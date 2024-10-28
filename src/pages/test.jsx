import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from 'react-redux';
import { resetStatus, setProfileActiveTab } from "../redux/AppSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../components/Profile';
import Orders from '../components/Orders';
import ChangePassword from '../components/ChangePassword';
import { FaBars } from 'react-icons/fa';
function ProfilePage() {

    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    const renderTabContent = () => {
        switch (profileActiveTab) {
            case '1': return (
                <Profile formData={formData} setFormData={setFormData} />
            )
            case '2': return (
                <Orders />
            );
            case '3':
                return (
                    <ChangePassword />
                )
            case '4':
                return <p>Các thiết lập khác</p>;
            default:
                return <p>Select a tab to view content.</p>;
        }
    };
    return (
        <Container className='profilePage'>
            <Button
                className='barsIcon d-md-none'
                onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
                <FaBars />
            </Button>
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