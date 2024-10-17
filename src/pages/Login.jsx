import React, { useState } from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [tenDangNhap, setUsername] = useState('');
  const [matKhau, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/taiKhoan/dangNhap',
        { tenDangNhap, matKhau }
      );

      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <Container fluid className="loginForm">
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={6}>
          <div className="p-4 border rounded-3 shadow-sm">
            <h1 className="text-center fw-bold mb-4">Đăng Nhập</h1>

            <div className="mb-4">
              <FloatingLabel label="Tên đăng nhập">
                <Form.Control
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={tenDangNhap}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faUser}
                  className="position-absolute top-50 translate-middle-y end-0 pe-3"
                />
              </FloatingLabel>
            </div>

            {/* Password Field with Show/Hide Icon */}
            <div className="position-relative mb-4">
              <FloatingLabel label="Mật khẩu">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  value={matKhau}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="position-absolute top-50 translate-middle-y end-0 pe-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <Form.Check
              type="checkbox"
              label="Nhớ mật khẩu"
              className="mb-4"
            />

            {/* Horizontal Button Alignment */}
            <div className="d-flex mb-3">
              <Button
                variant="primary"
                className="me-2"
                style={{ flex: 7 }} // 70% width equivalent
                onClick={handleLogin}
              >
                Đăng Nhập
              </Button>

              <Button
                variant="secondary"
                style={{ flex: 3 }} // 30% width equivalent
                onClick={() => navigate('/SignUp')}
              >
                Đăng Ký
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
