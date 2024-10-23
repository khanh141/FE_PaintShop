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
  const showAll = useSelector((state) => state.products.showAll);
  const searchTerm = useSelector((state) => state.products.searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sanPham/layTatCa');
        console.log('Dữ liệu sản phẩm từ API:', response.data);
        dispatch(setFilter(response.data));
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchTerm.trim()) return;
      try {
        const response = await axios.get(`http://localhost:8080/sanPham/timKiem?Searchreq=${searchTerm}`);
        console.log('Dữ liệu sản phẩm tìm kiếm:', response.data);
        dispatch(setFilter(response.data));
      } catch (error) {
        console.error('Error searching products:', error);
      }
    };
    if (searchTerm) {
      searchProducts(); 
    }
  }, [searchTerm, dispatch]);
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
    <div className='container'>
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
    </div>
  );
};


export default ProductsContainer;
