import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Form, FloatingLabel, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [matKhau, setMatKhau] = useState('');
    const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async () => {
        if (matKhau !== nhapLaiMatKhau) {
            setErrors('Mật khẩu nhập lại không khớp');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:8080/datLaiMatKhau',
                { password: matKhauMoi, token }
            );
            setSuccessMessage(response.data);
            setErrors('');
        } catch (error) {
            setErrors(error.response?.data || 'Có lỗi xảy ra, vui lòng thử lại');
            setSuccessMessage('');
        }
    };

    return (
        <Row className="mt-4 d-flex align-items-center justify-content-center ">
            <input type="text" name="hidden" autoComplete="off" style={{ display: 'none' }} />
            <Col md={6}>
                <Row className="p-4 border rounded-3 shadow-sm authForm">
                    <div className="password position-relative mt-4 p-0">
                        <FloatingLabel label="Mật khẩu mới">
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mật khẩu mới"
                                value={matKhau}
                                onChange={(e) => setMatKhau(e.target.value)}
                                autoComplete="new-password" // Disable autofill
                            />
                        </FloatingLabel>
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    {errors && (
                        <Alert className="mt-1" variant="danger">
                            {errors}
                        </Alert>
                    )}

                    <div className="repassword position-relative mt-4 p-0">
                        <FloatingLabel label="Nhập lại mật khẩu mới">
                            <Form.Control
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Nhập lại mật khẩu mới"
                                value={nhapLaiMatKhau}
                                onChange={(e) => setNhapLaiMatKhau(e.target.value)}
                                autoComplete="new-password" // Disable autofill
                            />
                        </FloatingLabel>
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            className="eye-icon"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </div>

                    {matKhau !== nhapLaiMatKhau && (
                        <Alert className="mt-1" variant="danger">
                            Mật khẩu nhập lại không khớp
                        </Alert>
                    )}

                    <Button
                        variant="primary"
                        className="mt-3"
                        style={{ width: '100%' }}
                        onClick={handleSubmit}
                    >
                        Đặt lại mật khẩu
                    </Button>

                    {successMessage && (
                        <Alert className="mt-3" variant="success">
                            {successMessage}
                        </Alert>
                    )}
                </Row>
            </Col>
        </Row>
    );
}

export default ResetPassword;
