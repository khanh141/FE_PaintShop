import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/ProductReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Card from './Card';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
const ProductsContainer = () => {
    const PRODUCTS_PER_PAGE = 15;

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.filteredProducts);
    const searchTerm = useSelector((state) => state.products.searchTerm); // Lấy searchTerm từ Redux
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/sanPham/layTatCa'
                );
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
                const response = await axios.get(
                    `http://localhost:8080/sanPham/timKiem?Searchreq=${searchTerm}`
                );
                dispatch(setFilter(response.data));
            } catch (error) {
                console.error('Error searching products:', error);
            }
        };
        if (searchTerm) {
            searchProducts(); // Gọi API tìm kiếm khi searchTerm thay đổi
        }
    }, [searchTerm, dispatch]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 500, behavior: 'smooth' }); // Smooth scroll to 500px from the top
    };

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

    const currentProducts = products.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );
    return (
        <Container className="productList">
            <Row>
                {currentProducts?.map((product, index) => (
                    <Col
                        xs={6}
                        sm={4}
                        md={3}
                        lg={2}
                        key={index}
                        className="cardCol p-1"
                    >
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
        </Container>
    );
};

export default ProductsContainer;
