import { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // FontAwesome icons
//import '../assets/css/RegistrationModal.scss';

function RegistrationModal({ show, onHide, onSubmit }) {
    const [hoTen, setFullName] = useState('');
    const [tenDangNhap, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setPhoneNumber] = useState('');
    const [matKhau, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {
        if (show) {
            // Reset form data when the modal is shown
            setFullName('');
            setUsername('');
            setEmail('');
            setPhoneNumber('');
            setPassword('');
            setConfirmPassword('');
            setPasswordsMatch(true);
        }
    }, [show]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPasswordsMatch(e.target.value, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPasswordsMatch(matKhau, e.target.value);
    };

    const checkPasswordsMatch = (pass1, pass2) => {
        setPasswordsMatch(pass1 === pass2);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            hoTen,
            tenDangNhap,
            email,
            sdt,
            matKhau,
        };
        onSubmit(formData);
        onHide(); // Close the modal after submission
    };

    return (
        <Modal show={show} onHide={onHide} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Đăng ký nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Full Name Field */}
                    <Form.Group className="mb-" controlId="formFullName">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập họ và tên"
                            value={hoTen}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>

                    {/* Username Field */}
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            value={tenDangNhap}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    {/* Email Address Field */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    {/* Phone Number Field */}
                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            value={sdt}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>

                    {/* matKhau Field */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu"
                                value={matKhau}
                                onChange={handlePasswordChange}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    {/* Re-enter Password Field */}
                    <Form.Group
                        className="mb-3"
                        controlId="formConfirmPassword"
                    >
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Nhập lại mật khẩu"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                isInvalid={!passwordsMatch}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                Mật khẩu không khớp
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Đóng
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={
                                !passwordsMatch || !matKhau || !confirmPassword
                            }
                        >
                            Đăng ký
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default RegistrationModal;
