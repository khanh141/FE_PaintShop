import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ImageSlides from "../components/ImageSlides";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetail = () => {
    const [baoBi, setBaoBi] = useState("");
    const [mau, setMau] = useState("");
    const [dinhMuc, setDinhMuc] = useState("");
    const [giaTien, setGiaTien] = useState(0);

    const handleSelectBaoBi = (eventKey) => {
        console.log("--------------------------" + eventKey);
        setBaoBi(eventKey);
    };

    const comments = [
        {
            id: 1,
            username: "Nguyễn Kiệt",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            id: 2,
            username: "Nguyễn Kiệt",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            id: 3,
            username: "Nguyễn Kiệt",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            id: 4,
            username: "Nguyễn Kiệt",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            id: 5,
            username: "Nguyễn Kiệt",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            id: 6,
            username: "Nguyễn Kiệt",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            id: 7,
            username: "Nguyễn Kiệt",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    ];

    return (
        <Container className="productDetail">
            <Row className="firstRow">
                <Col className="productImagesContainer ps-0" >
                    <ImageSlides></ImageSlides>
                </Col>
                <Col className="productInformation">
                    <Row className="productName my-2" id="name" style={{ fontWeight: 600, fontSize: '30px', width: '400px' }}>
                        Xe winnerX v3
                    </Row>
                    <Row className="productPrice my-2" id="price" style={{ fontWeight: 600, fontSize: '30px', color: 'red', width: '400px' }}>
                        45.000 - 65.000
                    </Row>
                    <Row className="saleFigures my-2" id="saleFigures" style={{ display: 'flex', width: '400px' }}>
                        <Col>
                            <span>Đã bán: 200</span>
                            <span>Đánh giá: 100</span>
                        </Col>
                    </Row>
                    <Row className="productDetailDropdown mb-2" id="baoBiDropdown" style={{ backgroundColor: 'rgb(245, 123, 123)', borderRadius: '8px', width: '400px', height: '50px', display: 'flex', alignItems: 'center' }}>
                        <Col>
                            <span style={{ width: '100px', display: 'inline-block' }}>Bao bì</span>
                            <Dropdown className="dropdownBtn" onSelect={handleSelectBaoBi} style={{ display: 'inline', flexGrow: 1 }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '250px' }}>
                                    {baoBi ? baoBi : "Chọn loại bao bì"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="baoBi1">Bao bì 1</Dropdown.Item>
                                    <Dropdown.Item eventKey="baoBi2">Bao bì 2</Dropdown.Item>
                                    <Dropdown.Item eventKey="baoBi3">Bao bì 3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row className="productDetailDropdown mb-2" id="mauDropdown" style={{ backgroundColor: 'rgb(245, 123, 123)', borderRadius: '8px', width: '400px', height: '50px', display: 'flex', alignItems: 'center' }} >
                        <Col>
                            <span style={{ width: '100px', display: 'inline-block' }}>Màu</span>
                            <Dropdown className="dropdownBtn" style={{ display: 'inline', flexGrow: 1 }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '250px' }}>
                                    Chọn màu
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row className="productDetailDropdown mb-2" id="dinhMucDropdown" style={{ backgroundColor: 'rgb(245, 123, 123)', borderRadius: '8px', width: '400px', height: '50px', display: 'flex', alignItems: 'center' }}>
                        <Col>
                            <span style={{ width: '100px', display: 'inline-block' }}>Định mức</span>
                            <Dropdown className="dropdownBtn" style={{ display: 'inline', flexGrow: 1 }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '250px' }}>
                                    Chọn định mức
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row style={{ width: '400px' }}>
                        <span>Giá tiền: chưa chọn các lựa chọn sản phẩm</span>
                    </Row>
                    <Row className="productQuantity my-2" style={{ width: '400px' }}>
                        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>Số lượng: </span>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary">-</Button>
                                <Button variant="secondary">1</Button>
                                <Button variant="secondary">+</Button>
                            </ButtonGroup>
                            <span>Trong kho: 1000</span>
                        </Col>
                    </Row>
                    <Row className="buttonGroup my-2" style={{ width: '400px' }}>
                        <Col style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="secondary" style={{ margin: '0 4px' }}>
                                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                            </Button>
                            <Button variant="secondary" style={{ margin: '0 4px' }}>Mua hàng</Button>
                        </Col>
                    </Row>
                </Col>

            </Row>
            <Row className="secondRow productDetailInfor my-4 ">
                <Table striped bordered hover className="m-0 rounded">
                    <thead>
                        <tr>
                            <th colSpan={2}>Thông tin chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Loại:</td>
                            <td>loại sản phẩm 1</td>
                        </tr>
                        <tr>
                            <td>Mô tả:</td>
                            <td>mô tả sản phẩm 1</td>
                        </tr>
                        <tr>
                            <td>Chức năng:</td>
                            <td>Chức năng sản phẩm 1</td>
                        </tr>
                        <tr>
                            <td>Nhà sản xuất:</td>
                            <td>Nhà sản xuất sản phẩm 1</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <hr />

            <Row className="thirdRow commentContainer hasScrollBar p-3 rounded" style={{ backgroundColor: 'white', maxHeight: '400px', overflowY: 'scroll', transition: 'max-height 0.3s ease-in-out', boxShadow: '1px 1px 10px rgb(142, 142, 142)' }}>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment mb-2 p-2 rounded" style={{ backgroundColor: 'wheat' }}>
                        <h6 className="username font-weight-bold">{comment.username}</h6>
                        <p className="content text-justify" style={{ textIndent: '10px', fontSize: '14px', lineHeight: '1.6' }}>
                            {comment.content}
                        </p>
                    </div>
                ))}
            </Row>
        </Container>
    );
};

export default ProductDetail;
