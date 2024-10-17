import React, { useState } from 'react';
import { Container, Button, Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [tenDangNhap, setUsername] = useState('');
  const [matKhau, setmatKhau] = useState('');
  const [nhaplaimatkhau, setnhaplaimatKhau] = useState('');
  const [sdt, setsdt] = useState('');
  const [hoTen, sethoTen] = useState('');
  const [diaChi, setdiaChi] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (matKhau !== nhaplaimatkhau) {
      alert('Mật khẩu không khớp. Vui lòng thử lại.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/taiKhoan/dangKy/khachHang', {
        tenDangNhap,
        matKhau,
        sdt,
        hoTen,
        diaChi,
      });
      navigate('/Login');
    } catch (error) {
      console.error('Đăng ký thất bại', error);
      alert('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <Container fluid className="signUpForm ">
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={6}>
          <div className="p-4 border rounded-3 shadow-sm">  {/* Border wrapper */}
            <h1 className="text-center fw-bold mb-3">Đăng Ký</h1>

            <Row className="g-3 mb-4">
              <Col md={8}>
                <FloatingLabel label="Họ và tên">
                  <Form.Control
                    type="text"
                    placeholder="Họ và tên"
                    value={hoTen}
                    onChange={(e) => sethoTen(e.target.value)}
                  />
                </FloatingLabel>
              </Col>

              <Col md={4}>
                <FloatingLabel label="Số điện thoại">
                  <Form.Control
                    type="text"
                    placeholder="Số điện thoại"
                    value={sdt}
                    onChange={(e) => setsdt(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel label="Địa chỉ" className="mb-4">
              <Form.Control
                type="text"
                placeholder="Địa chỉ"
                value={diaChi}
                onChange={(e) => setdiaChi(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel label="Tên đăng nhập" className="mb-4">
              <Form.Control
                type="text"
                placeholder="Tài Khoản"
                value={tenDangNhap}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FloatingLabel>

            <div className="position-relative mb-4">
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

            <div className="position-relative mb-4">
              <FloatingLabel label="Nhập lại mật khẩu">
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={nhaplaimatkhau}
                  onChange={(e) => setnhaplaimatKhau(e.target.value)}
                />
              </FloatingLabel>
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>

            <div className="d-flex mb-4">
              <Button
                variant="primary"
                className="me-2"
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
          </div>  {/* End border wrapper */}
        </Col>
      </Row>

    </Container>
  );
}
