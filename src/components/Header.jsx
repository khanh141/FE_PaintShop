import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../redux/ProductReducer';
import { clearUser } from '../redux/UserSlice'; // Import the clearUser action
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NavigationBar() {
    const [navbarOpacity, setNavbarOpacity] = useState(1); // Track opacity
    const [searchTerm, setSearchTermInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const quyen = useSelector((state) => state.user.quyen);
    const navbarHeight = '90px';

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Use Redux state

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        dispatch(setSearchTerm(searchTerm));
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/taiKhoan/dangXuat', {
                token: localStorage.getItem('token'),
            });
            localStorage.removeItem('token');
            dispatch(clearUser());
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Handle scroll to change navbar opacity
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newOpacity = scrollY > 90 ? 0.8 : 1; // Adjust based on scroll
            setNavbarOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup
    }, []);

    return (
        <>
            <Navbar
                bg="light"
                expand="lg"
                className="navbar"
                style={{
                    opacity: navbarOpacity,
                    transition: 'opacity 0.3s ease-in-out', // Smooth opacity transition
                }}
            >
                <Container fluid>
                    <Col xs={2}>
                        <Link className="navbar-brand text-black" to="/">
                            <img
                                src="/images/Logo.png"
                                alt="Logo"
                                className="img-fluid logo"
                            />
                        </Link>
                    </Col>
                    <Navbar.Toggle aria-controls="navbarSupportedContent">
                        <FontAwesomeIcon id="navbarToggerIcon" icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Row className="align-items-center w-100">
                            <Col
                                xs={2}
                                sm={4}
                                className="d-flex justify-content-center inputCol"
                            >
                                <div className="input-group">
                                    <input
                                        id="input"
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm theo tên"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTermInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearch();
                                            }
                                        }}
                                    />
                                    <button
                                        className="btn btn-primary priColor"
                                        onClick={handleSearch}
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>
                            </Col>
                            <Col xs={10} sm={8} className="d-flex linksCol">
                                <Nav className="linksContainer">
                                    {quyen === 'nhanVien' ||
                                        quyen === 'quanTriVien' ? (
                                        <Nav.Item className="px-2">
                                            <Link
                                                className="nav-link text-black fs-5"
                                                to="/admin"
                                            >
                                                <span className="fs-6 fs-md-5">
                                                    Trang Quản Lý
                                                </span>
                                            </Link>
                                        </Nav.Item>
                                    ) : (
                                        <></>
                                    )}
                                    <Nav.Item className="px-2">
                                        <Link
                                            className="nav-link btn btn-link text-black fs-5"
                                            to="/"
                                        >
                                            <span className="fs-6 fs-md-5">
                                                Trang Chủ
                                            </span>
                                        </Link>
                                    </Nav.Item>
                                    {isLoggedIn ? (
                                        <>
                                            <Nav.Item className="px-2">
                                                <Link
                                                    onClick={handleLogout}
                                                    className="nav-link text-black fs-5"
                                                >
                                                    <span className="fs-6 fs-md-5">
                                                        Đăng Xuất
                                                    </span>
                                                </Link>
                                            </Nav.Item>
                                            {location.pathname !== '/cart'
                                                && quyen !== 'nhanVien'
                                                && quyen !== 'quanTriVien'
                                                && (
                                                    <Nav.Item className="px-2">
                                                        <Link
                                                            className="nav-link text-black fs-5"
                                                            to="/cart"
                                                        >
                                                            <FaShoppingCart />
                                                        </Link>
                                                    </Nav.Item>
                                                )}
                                            <Nav.Item className="px-2 fs-5">
                                                <Link
                                                    className="nav-link text-black fs-5"
                                                    to="/profile"
                                                >
                                                    <FaUser />
                                                </Link>
                                            </Nav.Item>
                                        </>
                                    ) : (
                                        <>
                                            <Nav.Item className="px-2">
                                                <Link
                                                    className="nav-link text-black fs-5"
                                                    to="/signup"
                                                >
                                                    <span className="fs-6 fs-md-5">
                                                        Đăng Ký
                                                    </span>
                                                </Link>
                                            </Nav.Item>
                                            <Nav.Item className="px-2">
                                                <Link
                                                    className="nav-link fs-5 text-black"
                                                    to="/login"
                                                >
                                                    <span className="fs-6 fs-md-5">
                                                        Đăng Nhập
                                                    </span>
                                                </Link>
                                            </Nav.Item>
                                        </>
                                    )}
                                </Nav>
                            </Col>
                        </Row>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Add padding to the main content to avoid overlap */}
            <div style={{ paddingTop: navbarHeight }}>
                {/* Your page content goes here */}
            </div>
        </>
    );
}
