import axios from 'axios';
import React, { useState } from 'react'
import { Form, FloatingLabel, Button, Alert, Row, Col } from 'react-bootstrap'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSuccess } from "../redux/AppSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function ChangePassword() {

    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errors, setErrors] = useState('');

    const { tenDangNhap } = useSelector((store) => store.user)

    const handlePasswordChange = async () => {

        if (oldPassword === '' || newPassword === '') {
            toast.error("Chưa nhập mật khẩu");
            return;
        };

        try {
            dispatch(setLoading(true));
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                'http://localhost:8080/taiKhoan/doiMatKhau',
                { tenDangNhap, matKhauCu: oldPassword, matKhauMoi: newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            localStorage.setItem('token', response.data.token);
            dispatch(setLoading(false));
            toast.success("Đổi mật khẩu thành công", { position: "top-right", autoClose: 3000 })
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            setErrors("Sai thông tin đăng nhập")
            // setErrors(error.response.data)
            dispatch(setLoading(false))
        }
    };

    return (
        <div id='tab3' style={{ height: '7 0vh' }} className='profilePageContent changePasswordContainer'>
            <Form.Control type="text" style={{ display: 'none' }} autoComplete="username" />
            <Form.Control type="password" style={{ display: 'none' }} autoComplete="new-password" />
            <h3 className='mb-3'>Đổi mật khẩu</h3>
            <div className="position-relative mb-4 inputContainer"  >
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
            <Row>
                <Col xs={3}>
                    <Button
                        variant="primary"
                        className="me-2 priColor"
                        onClick={handlePasswordChange}
                    >
                        Đổi mật khẩu
                    </Button>
                </Col>
                <Col className='d-flex justify-content-start align-items-center'>
                    <div className="align-items-center">
                        <Link
                            to="/enterEmail"
                            className="text-center nav-link fs-6 p-0"
                            style={{ color: 'blue' }}
                        >
                            Bạn quên mật khẩu?
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>)
}

export default ChangePassword