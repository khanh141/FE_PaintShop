import React, { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Row,
    Col,
    FloatingLabel,
    Form,
    Alert,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { singup } from '~/services';

export default function Signup() {
    const [tenDangNhap, setUsername] = useState('');
    const [matKhau, setmatKhau] = useState('');
    const [nhaplaimatkhau, setnhaplaimatKhau] = useState('');
    const [sdt, setsdt] = useState('');
    const [hoTen, sethoTen] = useState('');
    const [diaChi, setdiaChi] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            // Gọi hàm signup đã được định nghĩa
            await singup({
                tenDangNhap,
                matKhau,
                sdt,
                hoTen,
                diaChi,
                email,
            });
            navigate('/Login');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorList = Object.entries(error.response.data).reduce(
                    (acc, [key, message]) => ({ ...acc, [key]: message }),
                    {}
                );

                console.log(error.response.data);

                // Xử lý các thông báo lỗi cụ thể
                if (error.response.data === 'So dien thoai da duoc su dung') {
                    errorList.sdt = 'Số điện thoại đã được sử dụng.';
                } else if (
                    error.response.data === 'Ten nguoi dung da ton tai'
                ) {
                    errorList.tenDangNhap = 'Tên người dùng đã tồn tại.';
                }

                setErrors(errorList);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    };

    const translateError = (error) => {
        const translations = {
            'Password must be 8 or more characters in length.':
                'Mật khẩu phải có độ dài từ 8 ký tự trở lên.',
            'Password must contain 1 or more uppercase characters.':
                'Mật khẩu phải chứa ít nhất 1 ký tự viết hoa.',
            'Password must contain 1 or more digit characters.':
                'Mật khẩu phải chứa ít nhất 1 chữ số.',
            'Password must contain 1 or more special characters.':
                'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.',
            'Email khong dung dinh dang': 'Email không đúng định dạng',
            'So dien thoai da duoc su dung': 'Số điện thoại đã được sử dụng.',
            'Ten nguoi dung da ton tai': 'Tên người dùng đã tồn tại.',
        };
        return error.split('-').map((msg) => translations[msg.trim()]);
    };
    useEffect(() => {
        window.scrollTo(0, 0); // Adjust the scroll position here
    }, []);

    return (
        <Container fluid className="signUpForm ">
            <Row className="mt-2 d-flex align-items-center justify-content-center">
                <Col md={6}>
                    <div className="p-4 border rounded-3 shadow-sm authForm">
                        {' '}
                        {/* Border wrapper */}
                        <h1 className="text-center fw-bold mb-3">Đăng Ký</h1>
                        <Form.Control
                            type="text"
                            style={{ display: 'none' }}
                            autoComplete="username"
                        />
                        <Form.Control
                            type="password"
                            style={{ display: 'none' }}
                            autoComplete="new-password"
                        />
                        <FloatingLabel label="Tên đăng nhập" className="mt-4">
                            <Form.Control
                                type="text"
                                placeholder="Tài Khoản"
                                value={tenDangNhap}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FloatingLabel>
                        {errors.tenDangNhap && (
                            <Alert className="mt-1" variant="danger">
                                {errors.tenDangNhap}
                            </Alert>
                        )}
                        <div className="password position-relative mt-4">
                            <FloatingLabel label="Mật khẩu">
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Mật khẩu"
                                    value={matKhau}
                                    onChange={(e) => setmatKhau(e.target.value)}
                                />
                            </FloatingLabel>
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        {errors.matKhau && (
                            <Alert className="mt-1" variant="danger">
                                {translateError(errors.matKhau).map(
                                    (translatedMsg, index) => (
                                        <div key={index}> {translatedMsg}</div>
                                    )
                                )}
                            </Alert>
                        )}
                        <div className="repassword position-relative mt-4">
                            <FloatingLabel label="Nhập lại mật khẩu">
                                <Form.Control
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Nhập lại mật khẩu"
                                    value={nhaplaimatkhau}
                                    onChange={(e) =>
                                        setnhaplaimatKhau(e.target.value)
                                    }
                                />
                            </FloatingLabel>
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? faEyeSlash : faEye}
                                className="eye-icon"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            />
                        </div>
                        {nhaplaimatkhau != matKhau && (
                            <Alert className="mt-1" variant="danger">
                                Mật khẩu nhập lại không khớp
                            </Alert>
                        )}
                        <Row className="g-2 nameAndphone mt-4">
                            <Col md={6}>
                                <FloatingLabel label="Họ và tên">
                                    <Form.Control
                                        type="text"
                                        placeholder="Họ và tên"
                                        value={hoTen}
                                        onChange={(e) =>
                                            sethoTen(e.target.value)
                                        }
                                    />
                                </FloatingLabel>
                                {errors.hoTen &&
                                    errors.hoTen.includes('trong') && (
                                        <Alert
                                            className="mt-1"
                                            variant="danger"
                                        >
                                            "Họ tên không được để trống"
                                        </Alert>
                                    )}
                            </Col>

                            <Col md={6}>
                                <FloatingLabel label="Số điện thoại">
                                    <Form.Control
                                        type="text"
                                        placeholder="Số điện thoại"
                                        value={sdt}
                                        onChange={(e) => setsdt(e.target.value)}
                                    />
                                </FloatingLabel>
                                {errors.sdt && (
                                    <Alert className="mt-1" variant="danger">
                                        {errors.sdt.includes('10') &&
                                            'Số điện thoại phải gồm 10 chữ số'}
                                        {errors.sdt.includes('trong') &&
                                            'Số điện thoại không được để trống'}
                                        {!errors.sdt.includes('10') &&
                                            !errors.sdt.includes('trong') &&
                                            errors.sdt}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <FloatingLabel label="Email" className="mt-4">
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>
                        {errors.diaChi && (
                            <Alert className="mt-1" variant="danger">
                                {errors.sdt.includes('dang') &&
                                    'Email phải có định dạng `ten@gmail.com`'}
                                {errors.sdt.includes('trong') &&
                                    'Email không được để trống'}
                                {!errors.sdt.includes('10') &&
                                    !errors.sdt.includes('trong') &&
                                    errors.sdt}
                            </Alert>
                        )}
                        <FloatingLabel label="Địa chỉ" className="mt-4">
                            <Form.Control
                                type="text"
                                placeholder="Địa chỉ"
                                value={diaChi}
                                onChange={(e) => setdiaChi(e.target.value)}
                            />
                        </FloatingLabel>
                        {errors.diaChi && (
                            <Alert className="mt-1" variant="danger">
                                Địa chỉ không được để trống
                            </Alert>
                        )}
                        <div className="d-flex my-4">
                            <Button
                                variant="primary"
                                className="me-2 sndColor"
                                style={{ flex: 7 }}
                                onClick={handleSignup}
                            >
                                Đăng Ký
                            </Button>

                            <Button
                                variant="secondary"
                                style={{ flex: 3 }}
                                onClick={() => navigate('/Login')}
                            >
                                Đăng Nhập
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
