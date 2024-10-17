import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHashtag, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrValidate } from "react-icons/gr";
import { IoPersonCircle } from "react-icons/io5";

function Info() {
    return (
        <Container className="info-container">
            <Row className="info-row">
                <Col className="info-col" xs={12}>
                    <span className="companyName">CÔNG TY CỔ PHẦN XÂY DỰNG TÙNG DŨNG</span>
                </Col>
            </Row>
            <Row className="info-row">
                <Col className="info-col-left" xs={3}><FaHashtag /> Mã số thuế</Col>
                <Col className="info-col" xs={9}>1801629377</Col>
            </Row>
            <Row className="info-row">
                <Col className="info-col-left" xs={3}><FaLocationDot /> Địa chỉ</Col>
                <Col className="info-col" xs={9}>
                    57, đường số 4, khu tái định cư Thới Nhựt 2, khu vực 1, Phường An Khánh, Quận Ninh Kiều, Thành phố Cần Thơ, Việt Nam
                </Col>
            </Row>
            <Row className="info-row">
                <Col className="info-col-left" xs={3}><IoPersonCircle /> Người đại diện</Col>
                <Col className="info-col" xs={9}>UNG THANH TÙNG (sinh năm 1977 - Sóc Trăng)</Col>
            </Row>
            <Row className="info-row">
                <Col className="info-col-left" xs={3}><FaPhoneAlt /> Điện thoại</Col>
                <Col className="info-col" xs={9}>0918944775</Col>
            </Row>
            <Row className="info-row">
                <Col className="info-col-left" xs={3}><GrValidate /> Ngày hoạt động</Col>
                <Col className="info-col" xs={9}>Từ 20/02/2019</Col>
            </Row>
        </Container>
    );
}

export default Info;
