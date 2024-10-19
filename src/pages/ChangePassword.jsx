import React, { useState } from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const [tenDangNhap, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState('');

  // todo: CHUA XONG
  const handleChangPassword = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/taiKhoan/doiMatKhau',
        { tenDangNhap, matKhauCu, matKhauMoi }
      );
      localStorage.setItem('token', response.data.token);
      navigate('/Login');
    } catch (error) {
      setErrors(error.response.data)
    }
  };

  return (
    <Container fluid className="loginForm">
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={6}>
          <div className="p-4 border rounded-3 shadow-sm">
            <h1 className="text-center fw-bold mb-4">Đổi mật khẩu</h1>

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

            <div className="position-relative mb-4">
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
            <div className="position-relative mb-4">
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

            {(errors &&
              <Alert className='mt-1' variant="danger">{errors}</Alert>
            )}

            <div className="d-flex mb-3">
              <Button
                variant="primary"
                className="me-2"
                style={{ flex: 7 }}
                onClick={handleChangPassword}
              >
                Đổi mật khẩu
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
