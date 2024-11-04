import React, { useState } from 'react';
import { Row, Col, Form, FloatingLabel, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading, setSuccess } from '~/redux/AppSlice';
import Loading from './Loading';

function EnterEmail() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState(''); // Success message state

    const dispatch = useDispatch();

    const handleEnterEmail = async () => {
        if (!email) {
            setErrors('Chưa nhập thông tin');
            return;
        }
        try {
            dispatch(setLoading(true))
            const response = await axios.post(
                'http://localhost:8080/taiKhoan/quenMatKhau',
                { email }
            );
            if (response.data) {
                setMessage(translateError(response.data));
            }
            setErrors('');
            dispatch(setSuccess(true))
        } catch (error) {
            dispatch(setLoading(false))
            const errorMessage = error.response?.data || 'Lỗi không xác định';
            setErrors(translateError(errorMessage));
            setMessage('');
        }
    };
    const translateError = (error) => {
        const translations = {
            'Khong tim thay tai khoan khach hang': 'Không tìm thấy tài khoản khách hàng',
            'Password_reset email sent': 'Email đã được gửi. Kiểm tra thư rác nếu không thấy email.'
        };
        return translations[error] || error;
    };
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleEnterEmail();
        }
    };
    return (
        <div id='enterEmail loading-container'>
            <Loading />
            <Row className="mt-4 d-flex align-items-center justify-content-center ">
                <Col md={6}>
                    <Row className="p-4 border rounded-3 shadow-sm align-items-center justify-content-center flex-column authForm">
                        <h5 className="text-center fw-bold mb-4">Khôi phục mật khẩu</h5>
                        <div className="p-0 mb-2">
                            <FloatingLabel label="Email">
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleEnter}
                                />
                            </FloatingLabel>
                        </div>

                        {/* Render success or error messages */}
                        {message && (
                            <Alert className="mt-1 w-100" variant="success">
                                {message}
                            </Alert>
                        )}
                        {errors && (
                            <Alert className="mt-1 w-100" variant="danger">
                                {errors}
                            </Alert>
                        )}

                        <Button
                            variant="primary"
                            className="mt-3 priColor"
                            style={{ width: '100px' }}
                            onClick={handleEnterEmail}
                        >
                            Gửi
                        </Button>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default EnterEmail;
