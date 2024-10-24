import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const ProductDetail = () => {
  const { maSanPham } = useParams();
  const [product, setProduct] = useState({});
  const [selectedBaoBi, setSelectedBaoBi] = useState(null);
  const [selectedMau, setSelectedMau] = useState(null);
  const [price, setPrice] = useState("Chưa chọn màu và bao bì");

  const imageUrl = "/images/product.jpg";

  const handleSelectBaoBi = (eventKey) => {
    setSelectedBaoBi(eventKey);
  };

  const handleSelectMau = (eventKey) => {
    setSelectedMau(eventKey);
  };

  useEffect(() => {
    const selectedDetail = product.chiTietSanPhamResList?.find(
      (detail) => detail.loaiBaoBi === selectedBaoBi && detail.mau === selectedMau
    );
    if (selectedDetail) {
      setPrice(selectedDetail.giaTien.toLocaleString());
    } else {
      setPrice("Chưa chọn màu và bao bì");
    }
  }, [selectedBaoBi, selectedMau, product]);

  const viewDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/sanPham/${maSanPham}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  useEffect(() => {
    if (maSanPham) {
      viewDetail();
    }
  }, [maSanPham]);

  const buttonStyle = {
    width: '25%',
    borderRadius: '5px',
    padding: '10px',
    margin: '5px',
    cursor: 'pointer',
  };

  const selectedStyle = {
    backgroundColor: 'blue',
    color: 'white',
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
        <Col className="productImagesContainer ps-0">
          <div id="image">
            <img src={imageUrl} alt="" />
          </div>
        </Col>
        <Col className="productInformation">
          <Row className="productName my-2" style={{ fontWeight: 600, fontSize: "30px", width: "400px" }}>
            {product.ten}
          </Row>
          <Row className="productPrice my-2" style={{ fontWeight: 600, fontSize: "30px", color: "red", width: "400px" }}>
            {price}
          </Row>
          <Row className="saleFigures my-2" style={{ display: "flex", width: "400px" }}>
            <Col>
              <span>Đã bán: 200 </span>
              <span> Đánh giá: 100</span>
            </Col>
          </Row>

          <Row>
            <Col>
              <Row className="mb-3">
                <span style={{ width: "100px", display: "inline-block" }}>Bao bì</span>
                {product.chiTietSanPhamResList && product.chiTietSanPhamResList.length > 0 ? (
                  (() => {
                    const renderedBaoBi = [];
                    return product.chiTietSanPhamResList.map((chitiet, index) => {
                      if (!renderedBaoBi.includes(chitiet.loaiBaoBi)) {
                        renderedBaoBi.push(chitiet.loaiBaoBi);
                        return (
                          <button
                            key={index}
                            style={{
                              ...buttonStyle,
                              ...(selectedBaoBi === chitiet.loaiBaoBi ? selectedStyle : {}),
                            }}
                            onClick={() => handleSelectBaoBi(chitiet.loaiBaoBi)}
                          >
                            {chitiet.loaiBaoBi}
                          </button>
                        );
                      }
                      return null;
                    });
                  })()
                ) : (
                  <p>Không có dữ liệu</p>
                )}
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
              <Row className="mb-3">
                <span style={{ width: "100px", display: "inline-block" }}>Màu</span>
                {product.chiTietSanPhamResList && product.chiTietSanPhamResList.length > 0 ? (
                  (() => {
                    const renderedMau = [];
                    return product.chiTietSanPhamResList.map((chitiet, index) => {
                      if (!renderedMau.includes(chitiet.mau)) {
                        renderedMau.push(chitiet.mau);
                        return (
                          <button
                            key={index}
                            style={{
                              ...buttonStyle,
                              ...(selectedMau === chitiet.mau ? selectedStyle : {}),
                            }}
                            onClick={() => handleSelectMau(chitiet.mau)}
                          >
                            {chitiet.mau}
                          </button>
                        );
                      }
                      return null;
                    });
                  })()
                ) : (
                  <p>Không có dữ liệu</p>
                )}
              </Row>
            </Col>
          </Row>
          <Row style={{ width: "400px" }}>
            <span>Giá tiền: {price}</span>
          </Row>
          <Row className="buttonGroup my-2" style={{ width: "400px" }}>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="secondary" style={{ margin: "0 4px" }}>
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
              </Button>
              <Button variant="secondary" style={{ margin: "0 4px" }}>
                Mua hàng
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <hr />

      <Row
        className="thirdRow commentContainer hasScrollBar p-3 rounded"
        style={{
          backgroundColor: "white",
          maxHeight: "400px",
          overflowY: "scroll",
          transition: "max-height 0.3s ease-in-out",
          boxShadow: "1px 1px 10px rgb(142, 142, 142)",
        }}
      >
        {comments.map((comment) => (
          <div key={comment.id} className="comment mb-2 p-2 rounded" style={{ backgroundColor: "wheat" }}>
            <h6 className="username font-weight-bold">{comment.username}</h6>
            <p className="content text-justify" style={{ textIndent: "10px", fontSize: "14px", lineHeight: "1.6" }}>
              {comment.content}
            </p>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default ProductDetail;
