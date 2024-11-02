import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Modal, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from 'react-redux';
import { resetStatus, setProfileActiveTab } from "../redux/AppSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../components/Profile';
import Orders from '../components/Orders';
import ChangePassword from '../components/ChangePassword';
import { FaBars } from "react-icons/fa";

function ProfilePage() {

    const dispatch = useDispatch();

    const { isSuccess, profileActiveTab } = useSelector((state) => state.app);
    const { tenDangNhap } = useSelector((store) => store.user)
    const [showSideBar, setShowSideBar] = useState(false)
    const quyen = useSelector((state) => state.user.quyen)

    const sideBarRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [profileActiveTab]);

    const handleShowSideBar = () => {
        setShowSideBar(!showSideBar)
    }

    const handleSwitchTab = (tab) => {
        if (tab === profileActiveTab) return;
        dispatch(setProfileActiveTab(tab));
        handleShowSideBar();
    }

    const handleClickOutOfSideBar = (event) => {
        if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
            setShowSideBar(false);
        }
    }
    useEffect(() => {
        if (showSideBar) {
            document.addEventListener('mousedown', handleClickOutOfSideBar);
        } else {
            document.removeEventListener('mousedown', handleClickOutOfSideBar);
        }
        return () => document.removeEventListener('mousedown', handleClickOutOfSideBar);
    }, [showSideBar]);

    const renderTabContent = () => {
        switch (profileActiveTab) {
            case '1': return (
                <Profile />
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
            <Row className="mainContainer h-100 mt-4">
                <Col ref={sideBarRef} xl={2} md={3} className={`text-white p-3 sideBar pt-4 ${showSideBar ? 'showSideBar' : 'hideSideBar'}`}>
                    <FaBars id='sideBarIcon' onClick={handleShowSideBar} />
                    <div className="profile">
                        <CgProfile />
                        <span className='ms-2'>{tenDangNhap}</span>
                    </div>
                    <ul className="sideBarList ps-1">
                        <li
                            className={profileActiveTab === '1' ? 'active' : ''}
                            onClick={() => handleSwitchTab('1')}
                        >
                            Hồ sơ
                        </li>
                        {(quyen !== "nhanVien") && <li
                            className={profileActiveTab === '2' ? 'active' : ''}
                            onClick={() => handleSwitchTab('2')}
                        >
                            Đơn mua
                        </li>}
                        <li
                            className={profileActiveTab === '3' ? 'active' : ''}
                            onClick={() => handleSwitchTab('3')}
                        >
                            Đổi mật khẩu
                        </li>
                        <li
                            className={profileActiveTab === '4' ? 'active' : ''}
                            onClick={() => handleSwitchTab('4')}
                        >
                            Thiết lập khác
                        </li>
                    </ul>
                </Col>
                <Col xl={10} md={9} className="bg-light p-4 contentContainer">
                    {renderTabContent()}
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default ProfilePage