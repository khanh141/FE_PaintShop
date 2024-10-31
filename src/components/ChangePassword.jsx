import axios from 'axios';
import React, { useState } from 'react'
import { Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSuccess } from "../redux/AppSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <Button
                variant="primary"
                className="me-2 sndColor"
                onClick={handlePasswordChange}
            >
                Đổi mật khẩu
            </Button>
        </div>)
}

export default ChangePassword