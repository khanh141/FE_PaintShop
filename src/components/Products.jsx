import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setShowAll } from '../redux/ProductReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Card from './Card';
import axios from 'axios';
import Pagination from "react-bootstrap/Pagination";
const ProductsContainer = () => {

  const PRODUCTS_PER_PAGE = 15;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const displayedCards = useSelector((state) => state.products.displayedCards);
  const [Searchreq, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );
  const handlePageChange = (page) => setCurrentPage(page);

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/sanPham/layTatCa"
        );
        console.log("Dữ liệu sản phẩm từ API:", response.data);
        dispatch(setFilter(response.data));
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, [dispatch]);

  const handleSearch = async () => {
    if (!Searchreq.trim()) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/sanPham/timKiem?Searchreq=${Searchreq}`
      );
      console.log("Dữ liệu sản phẩm: " + response.data);
      dispatch(setFilter(response.data));
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };
  const displayedProducts = products.slice(0, displayedCards);

  return (
    <Container className='productList'>
      <div className="my-3 w-50 mx-auto align-items-center searchInput">
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
        {currentProducts.map((product, index) => (
          <Col xs={6} sm={4} md={3} lg={2} key={index} className="cardCol p-1">
            <Card
              id={product.maSanPham}
              image={product.hinhAnh}
              name={product.ten}
              type={product.loai}
              giatien={product.chiTietSanPhamResList[0]?.giaTien}
            />
          </Col>
        ))}
      </Row>
      {/* React-Bootstrap Pagination */}
      <Row className="justify-content-center mt-4">
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Row>
    </Container>
  );
};


export default ProductsContainer;