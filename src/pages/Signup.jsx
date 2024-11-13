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
import { useDispatch } from 'react-redux';
import { setLoading, setSuccess } from '~/redux/AppSlice';
import Loading from '~/components/Loading';
import { toast } from 'react-toastify';

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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            dispatch(setLoading(true));
            await singup({
                tenDangNhap,
                matKhau,
                sdt,
                hoTen,
                diaChi,
                email,
            });
            dispatch(setSuccess(true));
            toast.success('Đăng ký thành công!', {
                position: 'top-right',
                autoClose: 3000,
            });
            navigate('/Login');
        } catch (error) {
            dispatch(setLoading(false));
            if (error.response && error.response.data) {
                const errorList = Object.entries(error.response.data).reduce(
                    (acc, [key, message]) => ({ ...acc, [key]: message }),
                    {}
                );

                if (error.response.data === 'Số điện thoại đã được sử dụng') {
                    errorList.sdt = 'Số điện thoại đã được sử dụng.';
                } else if (
                    error.response.data === 'Tên người dùng đã tồn tại'
                ) {
                    errorList.tenDangNhap = 'Tên người dùng đã tồn tại.';
                } else if (error.response.data === 'Email đã được sử dụng') {
                    errorList.email = 'Email đã được sử dụng';
                }
                setErrors(errorList);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    };
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleSignup();
        }
    };
    const translateError = (error) => {
        if (!error) return;
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
            'Số điện thoại đã được sử dụng': 'Số điện thoại đã được sử dụng.',
            'Tên người dùng đã tồn tại': 'Tên đăng nhập đã tồn tại.',
            'Email đã được sử dụng': 'Email đã được sử dụng',
        };
        return error.split('-').map((msg) => translations[msg.trim()]);
    };
    useEffect(() => {
        window.scrollTo(0, 0); // Adjust the scroll position here
    }, []);

    return (
        <Container fluid className="signUpForm" id="loading-container">
            <Loading />
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
                                {errors.tenDangNhap ===
                                'Ten dang nhap phai co IT NHAT 3 ky tu'
                                    ? 'Tên đăng nhập phải có ít nhất 3 ký tự'
                                    : errors.tenDangNhap ===
                                      'Ten dang nhap khong duoc bo trong'
                                    ? 'Tên đăng nhập không được bỏ trống'
                                    : errors.tenDangNhap}
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
                                            Họ tên không được để trống
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
                        {errors.email && (
                            <Alert className="mt-1" variant="danger">
                                {errors.email.includes('dang') &&
                                    'Email phải có định dạng `ten@gmail.com`'}
                                {errors.email.includes('trong') &&
                                    'Email không được để trống'}
                                {errors.email.includes('dụng') &&
                                    'Email đã được sử dụng'}
                            </Alert>
                        )}
                        <FloatingLabel label="Địa chỉ" className="mt-4">
                            <Form.Control
                                type="text"
                                placeholder="Địa chỉ"
                                value={diaChi}
                                onChange={(e) => setdiaChi(e.target.value)}
                                onKeyDown={handleEnter}
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
                                className="me-2 priColor"
                                style={{ flex: 7 }}
                                onClick={handleSignup}
                            >
                                Đăng Ký
                            </Button>

                            <Button
                                className="addtionalBtn"
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
