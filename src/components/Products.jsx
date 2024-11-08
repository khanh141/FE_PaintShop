import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setButtonDisabled, setFilter } from '../redux/ProductReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Container, DropdownButton, Dropdown } from 'react-bootstrap';
import Card from './Card';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { setLoading, setSuccess } from '~/redux/AppSlice';
import Loading from './Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
const ProductsContainer = () => {
    const PRODUCTS_PER_PAGE = 15;

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.filteredProducts);
    const searchTerm = useSelector((state) => state.products.searchTerm);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const [firstRender, setFirstRender] = useState(true); // Track first render
    const [loai, setLoai] = useState("");
    const [selectedType, setSelectedType] = useState('Chọn loại sản phẩm');
    // Load all products
    const loadProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get('http://localhost:8080/sanPham/layTatCa');
            const loaiReq = await axios.get('http://localhost:8080/sanPham/layTatCaLoai');
            setLoai(loaiReq.data);
            dispatch(setFilter(response.data));
            dispatch(setSuccess(true));
        } catch (error) {
            dispatch(setLoading(false));
            console.error('Error loading products:', error);
        }
    };

    const searchProducts = async () => {
        if (searchTerm === '') {
            loadProducts();
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/sanPham/timKiem?Searchreq=${searchTerm}`);
            if (response.data.length === 0) {
                dispatch(setButtonDisabled(true))
                setTimeout(() => {
                    dispatch(setButtonDisabled(false))
                }, 4000);
                toast.error("Không tìm thấy sản phẩm", { position: 'top-right', autoClose: 3000 });
                return;
            }
            dispatch(setFilter(response.data));
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
            return;
        }
        // todo: mo lai
        // searchProducts();
    }, [searchTerm]);

    useEffect(() => {
        loadProducts();
    }, []);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 600, behavior: 'smooth' });
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

    const handleLoadingProductType = async (productType) => {
        try {
            const response = await axios.get(`http://localhost:8080/sanPham/layTatCaSanPhamTheoLoai?loai=${productType}`);
            const products = response.data;
            dispatch(setFilter(response.data));
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    }
    const handleSelect = (productType) => {
        setSelectedType(productType);
        handleLoadingProductType(productType);
    };

    const [price, setPrice] = useState(100000);

    const showProductOnPrice = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/sanPham/layTatCaSanPhamTheoGia?giaTien=${price}`);
            const products = response.data;
            dispatch(setFilter(products));
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    }

    return (
        <Container className="productListContainer loading-container">
            <Row className="mt-4 filterContainer">
                <Col xs={6} lg={2} className='loaiSanPham'>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={selectedType}
                        onSelect={handleSelect}
                        className='w-100 px-0 filterButton'
                    >
                        {loai &&
                            loai.map((loais, index) => (
                                <Dropdown.Item key={index} eventKey={loais} className='priColor'>
                                    {loais}
                                </Dropdown.Item>
                            ))}
                    </DropdownButton>
                </Col>
                <Col xs={6} lg={2} className='xemTatCa'>
                    <Button onClick={loadProducts} className='w-100 px-0 filterButton priColor'>Xem tất cả</Button>
                </Col>
                <Col xs={12} lg={8} className='giaSanPham'>
                    <div className="price-range-slider">
                        <span>Khoảng giá</span>
                        <RangeSlider
                            value={price}
                            min={100000}
                            max={3000000}
                            onChange={(e) => setPrice(e.target.value)}
                            tooltip="on"
                            tooltipLabel={(currentValue) =>
                                `${currentValue.toLocaleString('vi-VN')} VND`
                            }
                        />
                        <div className="price-display">
                            Giá hiện tại:<span className="priColorText"> {Number(price).toLocaleString('vi-VN')} VND</span>
                        </div>
                        <button onClick={showProductOnPrice} className='apDungBtn sndColor btn'>Áp dụng giá</button>
                    </div>
                </Col>
            </Row>
            <Loading />
            <Row className='productList'>
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
