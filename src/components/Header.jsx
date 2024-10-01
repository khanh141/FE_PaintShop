import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
export default function Header() {
  return (<div >
    <nav className="navbar navbar-expand-lg BG" >
      <div className="container-fluid" >
        <a className="navbar-brand text-black fs-3" href="./index.html"
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
                href="./index.html"
              >Trang Chủ</a
              >
            </li>
            {/* <li className="nav-item px-2">
              <a
                className="nav-link text-black fs-5 rounded-pill px-3 my-2"
                href="#"
              >Sản Phẩm</a
              >
            </li> */}
            <li className="nav-item px-2">
              <a
                className="nav-link text-black fs-5 rounded-pill px-3 my-2"
                href="#"
              >Liên Hệ</a
              >
            </li>
            <li className="nav-item px-2">
              <a
                className="nav-link text-black fs-5 rounded-pill px-3 my-2"
                href="#"
              >Đăng Ký</a
              >
            </li>
            <li className="nav-item px-2">
              <a
                className="nav-link text-black fs-5 rounded-pill px-3 my-2"
                href="#"
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