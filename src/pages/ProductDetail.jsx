import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from "~/redux/CardReducer";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import MoreProducts from "~/components/MoreProducts";
import { setLoading, setSuccess } from "~/redux/AppSlice";
import Loading from "~/components/Loading";
import { FaCartPlus } from "react-icons/fa6";

const ProductDetail = () => {
  const { maSanPham } = useParams();
  const [product, setProduct] = useState({});
  const [danhGia, setDanhGia] = useState({})
  const [selectedBaoBi, setSelectedBaoBi] = useState(null);
  const [selectedMau, setSelectedMau] = useState(null);
  const [selectedDinhMuc, setSelectedDinhMuc] = useState(null);
  const [price, setPrice] = useState("");
  const [sumSoLuong, setSumSoLuong] = useState(0)
  const { tenDangNhap } = useSelector((state) => state.user);
  const [sameTypeProducts, setSameTypeProducts] = useState([]);
  const [numOfReview, setNumOfReview] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      setNumOfReview(danhGiaRes.data.length);
      const totalSoLuong = productDetailRes.data.chiTietSanPhamResList.reduce((total, item) => total + item.soLuong, 0);
      setSumSoLuong(totalSoLuong);
      const loaiSanPham = productDetailRes.data.loai;
      const maSanPhamHienTai = productDetailRes.data.maSanPham;
      await loadMoreOnLoai(loaiSanPham, maSanPhamHienTai, 0);
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tải thông tin sản phẩm", { position: "top-right", autoClose: 3000 })
    }
  };
  const loadMoreOnLoai = async (loaiSanPham, maSanPhamHienTai, currentPage) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(`http://localhost:8080/sanPham/layTheoLoai/${loaiSanPham}`, {
        params: { maSanPhamHienTai: maSanPhamHienTai, pageNumber: currentPage, pageSize: 20 }
      });

      setSameTypeProducts(response.data);
      dispatch(setSuccess(true))
    } catch (error) {
      console.error("Error loading more products of the same type:", error);

    }
  };


  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/Login')
      return
    }


    if (!checkSelectedInfo()) return;
    try {
      await axios.post('http://localhost:8080/gioHang/themSanPham', {
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
      toast.success("Thêm sản phẩm vào giỏ hàng thành công", { position: "top-right", autoClose: 3000 })
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng", { position: "top-right", autoClose: 3000 })
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

  useEffect(() => {
    if (maSanPham) {
      window.scrollTo(0, 0);
      viewDetail();
    }
  }, [maSanPham]);

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/Login')
      return
    }

    if (!checkSelectedInfo()) return;
    try {
      await axios.post('http://localhost:8080/gioHang/themSanPham', {
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
      toast.success("Thêm sản phẩm vào giỏ hàng thành công", { position: "top-right", autoClose: 3000 })
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng", { position: "top-right", autoClose: 3000 })
    }
    try {
      const selectedDetail = product.chiTietSanPhamResList?.find(
        (detail) =>
          detail.loaiBaoBi === selectedBaoBi &&
          detail.mau === selectedMau &&
          detail.loaiDinhMucLyThuyet === selectedDinhMuc
      );
      selectedDetail.soLuong = 1;
      const newProduct = {
        ...product,
        chiTietSanPhamResList: selectedDetail,

      };
      dispatch(addProduct({
        chiTietSanPham: {
          giaTien: newProduct.chiTietSanPhamResList.giaTien,
          loaiBaoBi: newProduct.chiTietSanPhamResList.loaiBaoBi,
          loaiDinhMucLyThuyet: newProduct.chiTietSanPhamResList.loaiDinhMucLyThuyet,
          maBaoBi: newProduct.chiTietSanPhamResList.maBaoBi,
          maDinhMucLyThuyet: newProduct.chiTietSanPhamResList.maDinhMucLyThuyet,
          maMau: newProduct.chiTietSanPhamResList.maMau,
          mau: newProduct.chiTietSanPhamResList.mau,
          soLuong: newProduct.chiTietSanPhamResList.soLuong
        },
        giaTien: newProduct.giaTien,
        hinhAnh: newProduct.hinhAnh,
        isChecked: true,
        loai: newProduct.loai,
        maSanPham: newProduct.maSanPham,
        moTa: newProduct.moTa,
        soLuong: newProduct.soLuong,
        ten: newProduct.ten,
        tenNhaSanXuat: newProduct.tenNhaSanXuat,
        tinhNang: newProduct.tinhNang
      }));
      toast.success('mua hàng thành công!', { position: "top-right", autoClose: 3000 }); // Thông báo thành công
      navigate('/purchase');
    } catch (error) {
      toast.error('Mua hàng thất bại!', { position: "top-right", autoClose: 3000 }); // Thông báo thất bại
    }
  }

  const checkSelectedInfo = () => {
    if (!selectedBaoBi) {
      toast.error("Bạn chưa chọn loại bao bì", { position: "top-right", autoClose: 3000 })
      return false;
    }
    if (!selectedMau) {
      toast.error("Bạn chưa chọn màu", { position: "top-right", autoClose: 3000 })
      return false;
    }
    if (!selectedDinhMuc) {
      toast.error("Bạn chưa chọn loại định mức", { position: "top-right", autoClose: 3000 })
      return false;
    }
    return true;
  }

  return (
    <Container className="productDetail">
      <Row >
        <Col xs={12} lg={5} className="productImagesContainer p-2">
          <div id="image">
            <img src={`/images/products/${product.hinhAnh}.png`} alt="" className="img-fluid" />
          </div>

        </Col>
        <Col xs={12} lg={7} className="productInformation">
          <Row id="productName" className="productName my-2">{product.ten}</Row>
          <Row className="saleFigures my-2">
            <Col className="p-0">
              <span>Đã bán: <span className="priColorText">{product.soLuongDaBan}</span> </span>
              {numOfReview > 0 ?
                (<span className="ms-3">Đánh giá: <span className="priColorText">
                  numOfReview
                </span></span>) :
                (<span className="ms-3">Đánh giá: <span className="sndColorText">
                  Chưa có đánh giá
                </span></span>)
              }
            </Col>
          </Row>
          <Row id="productPrice" className="priColorText productPrice my-2"  >
            {selectedMau && selectedBaoBi && selectedDinhMuc ? (
              <Col className="px-0">
                {price.toLocaleString()} <small style={{ fontSize: '24px' }}>VNĐ</small>
              </Col>
            ) : (
              <Col className="p-0">
                {minPrice.toLocaleString()} - {maxPrice.toLocaleString()} <small style={{ fontSize: '24px' }}>VND</small>
              </Col>
            )}
          </Row>

          <Row >
            <Col className="p-0">
              <Row className="mb-3">
                <span className="grayColorText" style={{ display: "inline-block" }}>
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
          <Row >
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
                                style={{
                                  userSelect: 'none',
                                  pointerEvents: renderredDinhMuc.length === 0 ? 'none' : 'auto'
                                }}
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
          <Row >
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
                                style={{
                                  userSelect: 'none',
                                  pointerEvents: product.chiTietSanPhamResList.filter(detail => detail.mau).length === 1 ? 'none' : 'auto'
                                }}
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

          <Row className="buttonGroup" style={{ width: "400px" }}>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <Button className="addToCartBtn" onClick={handleAddToCart}>
                <FaCartPlus className="me-2" />Thêm vào giỏ hàng
              </Button>
              <Button className="buyNowBtn" onClick={handleBuyNow}>
                Mua ngay
              </Button>
            </Col>
          </Row>
        </Col>
      </Row >
      <Row className="productDetailContainer p-3">
        <h5 className="mb-3">CHI TIẾT SẢN PHẨM</h5>
        <div>
          <span className="grayColorText">Loại sản phẩm:</span>
          <span className="priColorText">{product.loai}</span>
        </div>
        <div>
          <span className="grayColorText">Số lượng hàng: </span>
          <span>{sumSoLuong}</span>
        </div>
        <div>
          <span className="grayColorText">Tính năng: </span>
          <span>{product.tinhNang}</span>
        </div>
        <div>
          <span className="grayColorText">Nhà sản xuất:</span>
          <span>{product.tenNhaSanXuat}</span>
        </div>
        <div>
          <span className="grayColorText">Mô tả: </span>
          <span>{product.moTa || "Đang cập nhật"}</span>
        </div>

      </Row>
      <Row className="commentContainer hasScrollBar p-3">
        <h5 className="danhGiaTitle mb-3">ĐÁNH GIÁ SẢN PHẨM</h5>
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
          <Col>Chưa có đánh giá nào</Col>
        )}
      </Row>
      <Row className="sanPhamCungLoaiContainer p-3 loading-container">
        <Loading />
        <h5 className="mb-3">CÁC SẢN PHẨM CÙNG LOẠI</h5>
        {sameTypeProducts ? (
          <>
            <MoreProducts products={sameTypeProducts} />
          </>
        ) : (
          <span>Không có sản phẩm cùng loại</span>
        )}
      </Row>
      <ToastContainer />
    </Container >
  );
};

export default ProductDetail;
