import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Row,Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/taiKhoan/dangXuat', {
        token: localStorage.getItem('token')
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Col xs={2}>
        <Link className="navbar-brand text-black" to="/">
          <img src="/images/Logo.png" alt="Logo" className="img-fluid logo" />
        </Link>
        </Col>
        <Navbar.Toggle aria-controls="navbarSupportedContent">
          <FontAwesomeIcon id="navbarToggerIcon" icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarSupportedContent">
          <Row className="align-items-center w-100">
            <Col xs={6} className="d-flex justify-content-center">            
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm theo tên"
                />
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <button className="btn btn-primary">Tìm kiếm</button>
              </div>
            
            </Col>

            {/* Right side - Buttons */}
            <Col xs={6} className="d-flex justify-content-end">
              <Nav>
                <Nav.Item>
                  <Link className="nav-link text-black fs-5" to="/">
                    Trang Chủ
                  </Link>
                </Nav.Item>
                {isLoggedIn ? (
                  <>
                    <Nav.Item>
                      <button
                        onClick={handleLogout}
                        className="nav-link text-black fs-5"
                      >
                        Đăng xuất
                      </button>
                    </Nav.Item>
                    <Nav.Item className="px-2 fs-5">
                      <Link className="nav-link text-black fs-5" to="/profile">
                        <FaUser />
                      </Link>
                    </Nav.Item>
                  </>
                ) : (
                  <>
                    <Nav.Item className="px-2">
                      <Link className="nav-link text-black fs-5" to="/signup">
                        Đăng Ký
                      </Link>
                    </Nav.Item>
                    <Nav.Item className="px-2">
                      <Link className="nav-link fs-5 text-black" to="/login">
                        Đăng Nhập
                      </Link>
                    </Nav.Item>
                  </>
                )}
                {location.pathname === "/" && (
                  <Nav.Item className="px-2">
                    <Link className="nav-link text-black fs-5" to="/cart">
                      <FaShoppingCart />
                    </Link>
                  </Nav.Item>
                )}
              </Nav>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}