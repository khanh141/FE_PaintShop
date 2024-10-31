import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { maSanPham } = useParams();
  const [product, setProduct] = useState({});
  const [danhGia, setDanhGia] = useState({})
  const [selectedBaoBi, setSelectedBaoBi] = useState(null);
  const [selectedMau, setSelectedMau] = useState(null);
  const [selectedDinhMuc, setSelectedDinhMuc] = useState(null);
  const [price, setPrice] = useState("");
  const { tenDangNhap } = useSelector((state) => state.user);
  const navigate = useNavigate(); 

  const imageUrl = "/images/product.jpg";

  const handleSelectBaoBi = (baoBi) => {
    if (selectedBaoBi !== baoBi) {
      setSelectedBaoBi(baoBi);
      const associatedDinhMuc = product.chiTietSanPhamResList.find(
        (detail => detail.loaiBaoBi == baoBi)
      )?.loaiDinhMucLyThuyet;
      setSelectedDinhMuc(associatedDinhMuc || null)
    }
  }

  const handleSelectMau = (mau) => {
    setSelectedMau(selectedMau === mau ? null : mau);
  };

  const handleSelectDinhMuc = (dinhMuc) => {
    if (selectedDinhMuc !== dinhMuc) {
      setSelectedDinhMuc(dinhMuc);
      const associatedBaoBi = product.chiTietSanPhamResList.find(
        (detail) => detail.loaiDinhMucLyThuyet === dinhMuc
      )?.loaiBaoBi;
      setSelectedBaoBi(associatedBaoBi || null);
    }
  };

  const viewDetail = async () => {
    try {
      const productDetailRes = await axios.get(`http://localhost:8080/sanPham/${maSanPham}`);
      setProduct(productDetailRes.data);
      const danhGiaRes = await axios.get(`http://localhost:8080/sanPham/${maSanPham}/xemDanhGia`);
      setDanhGia(danhGiaRes.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    
    // Kiểm tra token trước khi thêm sản phẩm vào giỏ hàng
    if (!token) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login"); // Điều hướng đến trang đăng nhập
      return;
    }

    if (!selectedBaoBi || !selectedMau) {
      alert("Vui lòng chọn màu và bao bì.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/gioHang/themSanPham', {
        loaiBaoBi: selectedBaoBi,
        loaiDinhMucLyThuyet: selectedDinhMuc,
        maSanPham: product.maSanPham,
        mau: selectedMau,
        tenDangNhap: tenDangNhap,
        soLuong: 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Sản phẩm đã được thêm vào giỏ hàng');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng');
    }
  };

  useEffect(() => {
    if (selectedBaoBi && selectedMau && selectedDinhMuc) {
      const selectedDetail = product.chiTietSanPhamResList?.find(
        (detail) =>
          detail.loaiBaoBi === selectedBaoBi &&
          detail.mau === selectedMau &&
          detail.loaiDinhMucLyThuyet === selectedDinhMuc
      );

      setPrice(selectedDetail ? selectedDetail.giaTien : "")
    }
  }, [selectedBaoBi, selectedMau, selectedDinhMuc]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    if (product.chiTietSanPhamResList && product.chiTietSanPhamResList.length > 0) {
      const prices = product.chiTietSanPhamResList.map(chitiet => Number(chitiet.giaTien));
      const uniquePrices = Array.from(new Set(prices));
      if (uniquePrices.length > 0) {
        setMinPrice(Math.min(...uniquePrices));
        setMaxPrice(Math.max(...uniquePrices));
      }
    }
  }, [product]);
  useEffect(() => {
    if (product.chiTietSanPhamResList?.length > 0) {
      const uniqueBaoBi = Array.from(new Set(product.chiTietSanPhamResList.map(detail => detail.loaiBaoBi)));
      const uniqueMau = Array.from(new Set(product.chiTietSanPhamResList.map(detail => detail.mau)));
      const uniqueDinhMuc = Array.from(new Set(product.chiTietSanPhamResList.map(detail => detail.loaiDinhMucLyThuyet)));

      if (uniqueBaoBi.length === 1) setSelectedBaoBi(uniqueBaoBi[0]);
      if (uniqueMau.length === 1) setSelectedMau(uniqueMau[0]);
      if (uniqueDinhMuc.length === 1) setSelectedDinhMuc(uniqueDinhMuc[0]);
    }
  }, [product]);

  useEffect(() => {
    const selectedDetail = product.chiTietSanPhamResList?.find(
      (detail) =>
        detail.loaiBaoBi === selectedBaoBi &&
        detail.mau === selectedMau &&
        detail.loaiDinhMucLyThuyet === selectedDinhMuc
    );

    if (selectedBaoBi && selectedMau && selectedDinhMuc && selectedDetail) {
      setPrice(`${selectedDetail.giaTien.toLocaleString()}`);
    }
  }, [selectedBaoBi, selectedMau, selectedDinhMuc, product]);

  // tai san pham
  useEffect(() => {
    if (maSanPham) {
      viewDetail();
    }
  }, []);

  return (
    <Container className="productDetail">
      <Row >
        <Col md={4} className="productImagesContainer p-2">
          <div id="image" className="w-100 h-100">
            <img src={imageUrl} alt="" className="img-fluid" />
          </div>

        </Col>
        <Col md={8} className="productInformation ">
          <Row id="productName" className="productName my-2">{product.ten}</Row>
          <Row className="saleFigures my-2">
            <Col className="p-0">
              <span>Đã bán: 200 </span>
              <span>Đánh giá: 100</span>
            </Col>
          </Row>
          <Row id="productPrice" className="productPrice my-2"  >
            {selectedMau && selectedBaoBi && selectedDinhMuc ? (
              <Col className="p-0">
                {price.toLocaleString()} <small style={{ fontSize: '24px' }}>VNĐ</small>
              </Col>
            ) : (
              <Col className="p-0">
                {minPrice.toLocaleString()} - {maxPrice.toLocaleString()} <small style={{ fontSize: '24px' }}>VND</small>
              </Col>
            )}
          </Row>

          <Row>
            <Col className="p-0">
              <Row className="mb-3">
                <span style={{ display: "inline-block" }}>
                  Loại bao bì
                </span>
                <Col className="d-flex">
                  {product.chiTietSanPhamResList &&
                    product.chiTietSanPhamResList.length > 0 ? (
                    (() => {
                      const renderedBaoBi = [];
                      return product.chiTietSanPhamResList.map((chitiet, index) => {
                        if (!renderedBaoBi.includes(chitiet.loaiBaoBi)) {
                          renderedBaoBi.push(chitiet.loaiBaoBi);
                          return (
                            <div
                              key={`${chitiet.loaiBaoBi}-${index}`}
                              className={`optionBtn p-2 border rounded me-2 ${selectedBaoBi === chitiet.loaiBaoBi ? 'chosen' : 'bg-light'}`}
                              onClick={() => handleSelectBaoBi(chitiet.loaiBaoBi)}
                              style={{
                                userSelect: 'none',
                                pointerEvents: product.chiTietSanPhamResList.filter(detail => detail.loaiBaoBi).length === 1 ? 'none' : 'auto', // Locking logic
                              }}

                              role="button"
                            >
                              {chitiet.loaiBaoBi}
                            </div>
                          );
                        }
                        return null;
                      });

                    })()
                  ) : (
                    <p>Không có dữ liệu</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="p-0">
              <Row className="mb-3">
                <span style={{ display: "inline-block" }}>
                  Loại định mức lý thuyết
                </span>
                <Col className="d-flex">
                  {product.chiTietSanPhamResList &&
                    product.chiTietSanPhamResList.length > 0 ? (
                    (() => {
                      const renderredDinhMuc = [];
                      return product.chiTietSanPhamResList.map(
                        (chitiet, index) => {
                          if (!renderredDinhMuc.includes(chitiet.loaiDinhMucLyThuyet)) {
                            renderredDinhMuc.push(chitiet.loaiDinhMucLyThuyet);
                            return (
                              <div
                                key={`${chitiet.loaiDinhMucLyThuyet}-${index}`}
                                className={`optionBtn p-2 border rounded me-2 ${selectedDinhMuc === chitiet.loaiDinhMucLyThuyet ? 'chosen' : 'bg-light'}`}
                                onClick={() => handleSelectDinhMuc(chitiet.loaiDinhMucLyThuyet)}
                                style={{ userSelect: 'none', pointerEvents: renderredDinhMuc.length === 0 ? 'none' : 'auto' }}
                                role="button"
                              >
                                {chitiet.loaiDinhMucLyThuyet}
                              </div>
                            );
                          }
                          return null;
                        }
                      );
                    })()
                  ) : (
                    <p>Không có dữ liệu</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="p-0">
              <Row className="mb-3">
                <span style={{ display: "inline-block" }}>
                  Loại màu
                </span>
                <Col className="d-flex">
                  {product.chiTietSanPhamResList &&
                    product.chiTietSanPhamResList.length > 0 ? (
                    (() => {
                      const renderedMau = [];
                      return product.chiTietSanPhamResList.map(
                        (chitiet, index) => {
                          if (!renderedMau.includes(chitiet.mau)) {
                            renderedMau.push(chitiet.mau);
                            return (
                              <div
                                key={`${chitiet.mau}-${index}`}
                                className={`optionBtn p-2 border rounded me-2 ${selectedMau === chitiet.mau ? 'chosen' : 'bg-light'}`}
                                onClick={() => handleSelectMau(chitiet.mau)}
                                style={{ userSelect: 'none', pointerEvents: renderedMau.filter(detail => detail.mau).length === 0 ? 'none' : 'auto' }}
                                role="button"
                              >
                                {chitiet.mau}
                              </div>
                            );
                          }
                          return null;
                        }
                      );
                    })()
                  ) : (
                    <p>Không có dữ liệu</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="buttonGroup my-2" style={{ width: "400px" }}>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="secondary" style={{ margin: "0 4px" }} onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </Button>
              <Button variant="secondary" style={{ margin: "0 4px" }}>
                Mua hàng
              </Button>
            </Col>
          </Row>
        </Col>
      </Row >
      <Row
        className="commentContainer hasScrollBar p-3"
      >
        <h3 className="danhGiaTitle mb-3">ĐÁNH GIÁ SẢN PHẨM</h3>
        {danhGia && danhGia.length > 0 ? (
          danhGia.map((rating, index) => (
            <Row key={`${rating.tenDangNhapKhachHang}-${index}`}>
              <Col xs={1} className="tenDangNhap">
                <div className="tenDangNhapKhachHang">{rating.tenDangNhapKhachHang}</div>
              </Col>
              <Col xs={11} className="danhGia">
                <div className="soSao">
                  {Array.from({ length: rating.soSao }, (_, starIndex) => (
                    <span key={`${rating.tenDangNhapKhachHang}-${starIndex}-soSao`}>
                      <FaStar className="me-1" style={{ color: 'var(--primary-color)' }} />
                    </span>
                  ))}
                </div>
                <div className="ngayDang">{rating.ngayDang}</div>
                <div className="noiDung">{rating.noiDung}</div>
              </Col>

            </Row>
          ))
        ) : (
          <Col>No reviews available</Col>
        )}
      </Row>
    </Container >
  );
};

export default ProductDetail;
