import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FloatingLabel, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/UserSlice'; // Adjust the import path as needed

export default function Login() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    tenDangNhap: currentTenDangNhap,
    quyen
  } = useSelector((store) => store.user);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/taiKhoan/dangNhap',
        { tenDangNhap, matKhau }
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);

      dispatch(setUser(decodedToken.sub, decodedToken.scope));

      navigate('/');
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || 'An unknown error occurred');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container fluid className="loginForm">
      <Row className="mt-2 d-flex align-items-center justify-content-center">
        <Col md={6}>
          <div className="p-4 border rounded-3 shadow-sm authForm">
            <h1 className="text-center fw-bold mb-4">Đăng Nhập</h1>

            {/* Fake Inputs to Trick Browser Autofill */}
            <Form.Control type="text" style={{ display: 'none' }} autoComplete="username" />
            <Form.Control type="password" style={{ display: 'none' }} autoComplete="new-password" />

            <FloatingLabel label="Tên đăng nhập" className="mb-4">
              <Form.Control
                type="text"
                placeholder="Tên đăng nhập"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                autoComplete="off"
              />
              <FontAwesomeIcon icon={faUser} className="position-absolute top-50 translate-middle-y end-0 pe-3" />
            </FloatingLabel>

            <div className="position-relative mb-4">
              <FloatingLabel label="Mật khẩu">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  value={matKhau}
                  onChange={(e) => setMatKhau(e.target.value)}
                  autoComplete="off"
                  onKeyDown={handleEnter}
                />
              </FloatingLabel>
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="position-absolute top-50 translate-middle-y end-0 pe-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {errors && <Alert variant="danger" className="mt-1">{errors}</Alert>}

            <div className="d-flex mb-3">
              <Button variant="primary" className="sndColor me-2" style={{ flex: 7 }} onClick={handleLogin}>
                Đăng Nhập
              </Button>
              <Button variant="secondary" style={{ flex: 3 }} onClick={() => navigate('/SignUp')}>
                Đăng Ký
              </Button>
            </div>
            <Row className="align-items-center pb-4">
              <Link to="/enterEmail" className="text-center nav-link fs-6" style={{ color: 'blue' }}>
                Bạn quên mật khẩu?
              </Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
