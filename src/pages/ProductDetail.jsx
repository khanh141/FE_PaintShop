import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ProductDetail = () => {
    return (
        <Container className="productDetail">
            <Row>
                <Col className="productImagesContainer">
                    <img src="images/winx.jpg" alt="" />
                </Col>
                <Col className="productInformation" >
                    <Row className="productName" id="name">Xe winnerX v3</Row>
                    <Row className="productPrice" id="price">45.000</Row>
                    <Row className="saleFigures" id="saleFigures">
                        <h7>Đã bán: 200</h7>
                        <h7>Đánh giá: 100</h7>
                    </Row>
                    <Row className="productDetailDropdown" id="baoBiDropdown">
                        <h7>Bao bì</h7>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                    <Row className="productDetailDropdown" id="mauDropdown">
                        <h7>Màu</h7>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                    <Row className="productDetailDropdown" id="dinhMucDropdown">
                        <h7>Định mức</h7>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                    <Row>
                        <h7>Giá tiền: chưa chọn các lựa chọn sản phẩm</h7>
                    </Row>
                    <Row>
                        <Col>
                            <h7>Số lượng: </h7>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary">-</Button>
                                <Button variant="secondary">1</Button>
                                <Button variant="secondary">+</Button>
                            </ButtonGroup>
                        </Col>
                        <Col>
                            Trong kho: 1000
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="secondary">Thêm vào giỏ hàng</Button>
                        <Button variant="secondary">Mua hàng</Button>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>1 of 3</Col>
                <Col>2 of 3</Col>
                <Col>3 of 3</Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
