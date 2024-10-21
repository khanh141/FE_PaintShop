import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import ReactImageMagnify from "react-image-magnify";

const ProductDetail = () => {

  const { maSanPham } = useParams();
  const [baoBi, setBaoBi] = useState("");
  const [mau, setMau] = useState("");
  const [dinhMuc, setDinhMuc] = useState("");
  const [giaTien, setGiaTien] = useState(0);
  const [product, setProduct] = useState({});
  const imageUrl = "/images/product.jpg"


  const handleSelectBaoBi = (eventKey) => {
    setBaoBi(eventKey);
  };

  const handleSelectMau = (eventKey) => {
    setMau(eventKey);
  };

  const handleSelectDinhMuc = (eventKey) => {
    setDinhMuc(eventKey);
  };

  const viewDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/sanPham/${maSanPham}`
      );
      console.log(JSON.stringify(response.data, null, 2));
      setProduct(response.data);
    }
    catch (error) {
      console.error("Error searching products:", error);
    }
  }

  useEffect(() => {
    if (maSanPham) {
      viewDetail();
    }
  }, [maSanPham]);


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

  // <<<<<<< Updated upstream
  //   return (
  //     <Container className="productDetail">
  //       <Row className="firstRow">
  //         <Col className="productImagesContainer ps-0">
  //           <ImageSlides height="400px" width="100%" interval={null} imgStyles={slideImgStyles}></ImageSlides>
  //         </Col>
  //         <Col className="productInformation">
  //           <Row
  //             className="productName my-2"
  //             id="name"
  //             style={{ fontWeight: 600, fontSize: "30px", width: "400px" }}
  //           >
  //             {product.ten}
  //           </Row>
  //           <Row
  //             className="productPrice my-2"
  //             id="price"
  //             style={{
  //               fontWeight: 600,
  //               fontSize: "30px",
  //               color: "red",
  //               width: "400px",
  //             }}
  //           >
  //             45.000 - 65.000
  //           </Row>
  //           <Row
  //             className="saleFigures my-2"
  //             id="saleFigures"
  //             style={{ display: "flex", width: "400px" }}
  //           >
  //             <Col>
  //               <span>Đã bán: 200</span>
  //               <span>Đánh giá: 100</span>
  //             </Col>
  //           </Row>
  //           <Row
  //             className="productDetailDropdown mb-2"
  //             id="baoBiDropdown"
  //             style={{
  //               backgroundColor: "rgb(245, 123, 123)",
  //               borderRadius: "8px",
  //               width: "400px",
  //               height: "50px",
  //               display: "flex",
  //               alignItems: "center",
  //             }}
  //           >
  //             <Col>
  //               <span style={{ width: "100px", display: "inline-block" }}>
  //                 Bao bì
  //               </span>
  //               <Dropdown
  //                 className="dropdownBtn"
  //                 onSelect={handleSelectBaoBi}
  //                 style={{ display: "inline", flexGrow: 1 }}
  return (
    <Container className="productDetail">
      <Row className="firstRow">
        <Col className="productImagesContainer ps-0">
          <div id="imageManifier">
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: imageUrl
              },
              largeImage: {
                src: imageUrl,
                width: 1200,
                height: 800
              },
              enlargedImageContainerDimensions: {
                width: '110%',
                height: '110%',
              },
              enlargedImageContainerStyle: {
                position: 'absolute',
                top: '0',
                left: '-10',
                zIndex: 100,
              },
            }} />
          </div>
        </Col>
        <Col className="productInformation">
          <Row
            className="productName my-2"
            id="name"
            style={{ fontWeight: 600, fontSize: "30px", width: "400px" }}
          >
            {product.ten}
          </Row>
          <Row
            className="productPrice my-2"
            id="price"
            style={{
              fontWeight: 600,
              fontSize: "30px",
              color: "red",
              width: "400px",
            }}
          >
            45.000 - 65.000
          </Row>
          <Row
            className="saleFigures my-2"
            id="saleFigures"
            style={{ display: "flex", width: "400px" }}
          >
            <Col>
              <span>Đã bán: 200 </span>
              <span> Đánh giá: 100</span>
            </Col>
          </Row>
          <Row
          // className="productDetailDropdown mb-2"
          // id="baoBiDropdown"
          // style={{
          //   backgroundColor: "rgb(245, 123, 123)",
          //   borderRadius: "8px",
          //   width: "400px",
          //   height: "50px",
          //   display: "flex",
          //   alignItems: "center",
          // }}
          >
            <Col>
              <Row className="mb-3">
                <span style={{ width: "100px", display: "inline-block" }}>
                  Bao bì
                </span>
                {product.chiTietSanPhamResList &&
                  product.chiTietSanPhamResList.length > 0 ? (
                  product.chiTietSanPhamResList.map((chitiet, index) => (
                    <button
                      className="w-25 rounded"
                      key={index}
                      eventKey={chitiet.loaiBaoBi}
                    >
                      {chitiet.loaiBaoBi}
                    </button>
                  ))
                ) : (
                  <p>Không có dữ liệu</p>
                )}
              </Row>
            </Col>
          </Row>
          <Row
          // className="productDetailDropdown mb-2"
          // id="mauDropdown"
          // style={{
          //   backgroundColor: "rgb(245, 123, 123)",
          //   borderRadius: "8px",
          //   width: "400px",
          //   height: "50px",
          //   display: "flex",
          //   alignItems: "center",
          // }}
          >
            <Col>
              <Row className="mb-3">
                <span style={{ width: "100px", display: "inline-block" }}>
                  Màu
                </span>
                {product.chiTietSanPhamResList &&
                  product.chiTietSanPhamResList.length > 0 ? (
                  product.chiTietSanPhamResList.map((chitiet, index) => (
                    <button
                      className="w-25 rounded"
                      key={index}
                      eventKey={chitiet.mau}
                    >
                      {chitiet.mau}
                    </button>
                  ))
                ) : (
                  <p disabled>Không có dữ liệu</p>
                )}
              </Row>
            </Col>
          </Row>
          <Row
          // className="productDetailDropdown mb-2"
          // id="dinhMucDropdown"
          // style={{
          //   backgroundColor: "rgb(245, 123, 123)",
          //   borderRadius: "8px",
          //   width: "400px",
          //   height: "50px",
          //   display: "flex",
          //   alignItems: "center",
          // }}
          >
            <Col>
              <Row className="mb-3">
                <span style={{ width: "100px", display: "inline-block" }}>
                  Định mức
                </span>
                {product.chiTietSanPhamResList &&
                  product.chiTietSanPhamResList.length > 0 ? (
                  product.chiTietSanPhamResList.map((chitiet, index) => (
                    <button
                      className="w-25 rounded"
                      key={index}
                      eventKey={chitiet.loaiDinhMucLyThuyet}
                    >
                      {chitiet.loaiDinhMucLyThuyet}
                    </button>
                  ))
                ) : (
                  <p>Không có dữ liệu</p>
                )}
              </Row>
            </Col>
          </Row>
          <Row style={{ width: "400px" }}>
            <span>Giá tiền: chưa chọn các lựa chọn sản phẩm</span>
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
          <div
            key={comment.id}
            className="comment mb-2 p-2 rounded"
            style={{ backgroundColor: "wheat" }}
          >
            <h6 className="username font-weight-bold">{comment.username}</h6>
            <p
              className="content text-justify"
              style={{
                textIndent: "10px",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              {comment.content}
            </p>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default ProductDetail;
