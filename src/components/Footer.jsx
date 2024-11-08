import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaHashtag, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { IoPersonCircle } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <Container fluid className="p-5">
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="">
            <h4>CÔNG TY CỔ PHẦN XÂY DỰNG TÙNG DŨNG</h4>
          </Col>
        </Row>

        <Row className="justify-content-between information">
          {/* Company Info */}
          <Col md={6} className="text-center text-md-start mb-4">
            <p><FaHashtag /> Mã số thuế: 1801629377</p>
            <p>
              <FaLocationDot /> Địa chỉ: 57, đường số 4, khu tái định cư Thới Nhựt 2, khu vực 1,
              Phường An Khánh, Quận Ninh Kiều, Thành phố Cần Thơ, Việt Nam
            </p>
            <p>
              <IoPersonCircle /> Người đại diện: UNG THANH TÙNG (sinh năm 1977 - Sóc Trăng)
            </p>
          </Col>

          {/* Contact Information */}
          <Col md={3} className=" mb-4">
            <h5>Liên hệ</h5>
            <p><FaPhoneAlt /> Điện thoại: 0918944775</p>
            <p><GrValidate /> Ngày hoạt động: Từ 20/02/2019</p>
            <p>Email: tungdungcantho@gmail.com</p>
          </Col>

          {/* Bank Information */}
          <Col md={3} className="text-md-start mb-4">
            <h5>Thông tin tài khoản</h5>
            <p>Số tài khoản:</p>
            <p>112002684401 Vietinbank Tây Cần Thơ</p>
            <p>796879 tại SeaBank CN Cần Thơ</p>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row className="text-center mt-4">
          <Col>
            <p>&copy; 2024 CÔNG TY CỔ PHẦN XÂY DỰNG TÙNG DŨNG. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
