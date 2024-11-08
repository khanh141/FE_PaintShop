import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/ProductReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Card from './Card';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { setLoading, setSuccess } from '~/redux/AppSlice';
import Loading from './Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductsContainer = () => {
    const PRODUCTS_PER_PAGE = 15;

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.filteredProducts);
    const searchTerm = useSelector((state) => state.products.searchTerm); // Lấy searchTerm từ Redux
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    const loadProducts = async () => {
        try {
            dispatch(setLoading(true))
            const response = await axios.get(
                'http://localhost:8080/sanPham/layTatCa'
            );
            dispatch(setFilter(response.data));
            dispatch(setSuccess(true))
        } catch (error) {
            dispatch(setLoading(false))
            console.error('Error loading products:', error);
        }
    };
    const searchProducts = async () => {
        if (searchTerm === '') {
            loadProducts(); // Reload all products if search input is empty
            return;
        }
        // Otherwise, perform the search
        try {
            dispatch(setLoading(true))
            const response = await axios.get(
                `http://localhost:8080/sanPham/timKiem?Searchreq=${searchTerm}`
            );
            if (response.data.length === 0) {
                console.log("empty")
                // toast.error("Không tìm thấy sản phẩm", {
                //     position: 'top-right',
                //     autoClose: 3000,
                // });
                return; // Stop further processing if no products found
            }
            dispatch(setFilter(response.data));
            dispatch(setSuccess(true))
        } catch (error) {
            dispatch(setLoading(false))
            console.error('Error searching products:', error);
        }
    };
    useEffect(() => {
        loadProducts();
    }, [dispatch]);
    useEffect(() => {
        searchProducts();
    }, [searchTerm]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 600, behavior: 'smooth' }); // Smooth scroll to 600px from the top
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
    useEffect(() => {
        window.scrollTo({ top: 600, behavior: 'smooth' });
    })

    const currentProducts = products.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );
    return (
        <Container className="productList loading-container">
            <Loading />
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
                            soLuongDaBan={product.soLuongDaBan}
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
            <ToastContainer />
        </Container>
    );
};

export default ProductsContainer;
