import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link className="navbar-brand text-black fs-3" to="/">
          <img src="/images/Logo.png" alt="" className="img-fluid me-2 logo" />
        </Link>
        <Navbar.Toggle aria-controls="navbarSupportedContent">
          <FontAwesomeIcon id="navbarToggerIcon" icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto my-lg-0 me-sm-0 my-sm-0">
            <Nav.Item className="px-2">
              <Link
                className="nav-link text-black fs-5  px-3 my-2"
                to="/">
                Trang Chủ
              </Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Link
                className="nav-link text-black fs-5  px-3 my-2"
                to="/signup">
                Đăng Ký
              </Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Link
                className="nav-link text-black fs-5  px-3 my-2"
                to="/login">
                Đăng Nhập
              </Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Link
                className="nav-link text-black fs-5  px-3 my-2 d-none d-lg-block"
                to="#">
                <i className="fa-regular fa-user"></i>
              </Link>
              <Link
                className="nav-link text-black fs-5  px-3 my-2 d-lg-none"
                to="#">
                Tài Khoản
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  return (<div >
    <nav className="navbar navbar-expand-lg BG" >
      <div className="container-fluid" >
        <a className="navbar-brand text-black fs-3" href="./"
        >
          {/* TODO: can dua hinh anh qua noi khac luu tru */}
          <img
            src="/src/assets/components/Images/Logo.jpg"
            alt=""
            className="img-fluid me-2 logo"
          />Tùng Dũng </a
        >
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="text-black"><FontAwesomeIcon icon={faBars} /></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto my-lg-0 me-sm-0 my-sm-0">
            <li className="nav-item px-2">
              <a
                className="nav-link text-black fs-5 rounded-pill px-3 my-2"
                aria-current="page"
                href="./"
              >Trang Chủ</a
              >
            </li>
            <li className="nav-item px-2">
              <a
                className="nav-link text-black fs-5 rounded-pill px-3 my-2"
                href="signup"
              >Đăng Ký</a
              >
            </li>
            <li className="nav-item px-2">
              <a
                className="nav-link text-black fs-5 rounded-pill px-3 my-2"
                href="login"
              >Đăng Nhập</a
              >
            </li>

            <li className="nav-item px-2">
              <a
                className="nav-link text-black fs-5 rounded-pill px-3 my-2 d-none d-lg-block"
                href="#"
              ><i className="fa-regular fa-user"></i
              ></a>
              <a
                className="nav-link text-black fs-5 rounded-pill px-3 my-2 d-lg-none"
                href="#"
              >Tài Khoản
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>)
}
