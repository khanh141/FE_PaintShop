import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter,setShowAll } from '../redux/ProductReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button } from 'react-bootstrap';
import Card from './Card';
import axios from 'axios';

const ProductsContainer = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.filteredProducts);
    const displayedCards = useSelector((state) => state.products.displayedCards);
    const showAll = useSelector((state) => state.products.showAll);
    const [Searchreq,setSearchTerm]=useState("");
    
    // useEffect(() => {
    //     fetch('/testData.json')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             dispatch(setFilter(data));
    //         })
    //         .catch((error) => console.error('Error loading JSON:', error));
    // }, [dispatch]);

    useEffect(() => {
      const loadProducts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/sanPham/layTatCa"
          ); // Gọi API lấy dữ liệu sản phẩm từ backend
          console.log("Dữ liệu sản phẩm từ API:", response.data);
          dispatch(setFilter(response.data)); // Cập nhật lại Redux với dữ liệu nhận được
        } catch (error) {
          console.error("Error loading products:", error);
        }
      };
      loadProducts();  // Gọi hàm để tải dữ liệu ngay khi component mount
    }, [dispatch]);

    const handleSearch = async () => {
      if (!Searchreq.trim()) return; // Kiểm tra nếu từ khóa tìm kiếm rỗng
      try {
        const response = await axios.get(
          `http://localhost:8080/sanPham/timKiem?Searchreq=${Searchreq}`
        );  
        console.log("Dữ liệu sản phẩm: "+ response.data);
        dispatch(setFilter(response.data));  // Cập nhật lại Redux với dữ liệu tìm kiếm
      } catch (error) {
        console.error("Error searching products:", error);
      }
    };
  const displayedProducts = products.slice(0, displayedCards);

    return (
      <div>
        {/* <div className="filter-bar">
          <div className="mb-3 w-50 mx-auto align-items-center">
            <div className="row mb-3">
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Tìm kiếm theo tên"
                  // value={ten}
                />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <button className="btn btn-primary w-100">Tìm kiếm</button>
              </div>
            </div>
            {ten && (
              <button className="btn btn-secondary w-100">Xóa tìm kiếm</button>
            )}
          </div>
        </div> */}

        <div className="mb-3 w-50 mx-auto align-items-center">
          <div className="row mb-3">
            <div className="col-12 col-md-9">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Tìm kiếm theo tên"
                value={Searchreq}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-3 mb-3">
              <button className="btn btn-primary w-100" onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        <Row>

        {products.map((product) =>
          // Lặp qua từng chi tiết sản phẩm của mỗi sản phẩm
          product.chiTietSanPhamResList.map((chiTiet, index) => (
            <Col
              sm={6}
              md={4}
              lg={3}
              xl={3}
              // key={`${product.ten}-${index}`}
              className="mb-4"
            >
              <Card
                image={product.hinhAnh} // Giữ nguyên hình ảnh sản phẩm
                name={product.ten} // Tên sản phẩm giống nhau cho tất cả card
                type={product.loai}
                tinhnang={product.tinhNang} // Tính năng của từng chi tiết sản phẩm
                mota={product.moTa} // Mô tả riêng cho mỗi chi tiết sản phẩm
                giatien={chiTiet.giaTien} // Giá tiền của từng chi tiết sản phẩm
                soluong={chiTiet.soLuong}
              />
            </Col>
          ))
        )}
        </Row>

        {!showAll && (
          <div className="d-flex justify-content-center">
            <Button onClick={() => dispatch(setShowAll())}>Xem tất cả</Button>
          </div>
        )}
      </div>
    );
};

export default ProductsContainer;