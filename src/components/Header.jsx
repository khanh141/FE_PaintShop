// import { Link } from "react-router-dom";
// import { Navbar, Container, Nav } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useState } from 'react';

// export default function NavigationBar() { 
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // const [username, setUsername] = useState('');

//   useEffect(() => {
//     // Check for existing token on initial render
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//       // Get username from token or other storage mechanism
//       // setUsername(getUsernameFromToken(token));
//     }
//   }, []);

//   const handleLogout = async () => {
//     try {
//       // Replace with your actual backend API endpoint for logout
//       const response = await axios.post('http://localhost:8080/taiKhoan/dangXuat');
//       localStorage.removeItem('token');
//       setIsLoggedIn(false);
//       setUsername(''); // Clear username
//       navigate('/login'); // Redirect to login page after logout
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Optionally display an error message to the user
//     }
//   };

//   // Function to extract username from token (adjust based on your token structure)
//   // const getUsernameFromToken = (token) => {
//   //   // Parse the token and extract the username
//   //   return 'John Doe'; // Replace with actual username extraction logic
//   // };

//   return (
//     <Navbar bg="light" expand="lg">
//       <Container fluid>
//         <Link className="navbar-brand text-black fs-3" to="/">  {/* Maintained Trang Chủ link */}
//           <img src="/images/Logo.png" alt="" className="img-fluid me-2 logo" />
//         </Link>
//         <Navbar.Toggle aria-controls="navbarSupportedContent">
//           <FontAwesomeIcon id="navbarToggerIcon" icon={faBars} />
//         </Navbar.Toggle>
//         <Navbar.Collapse id="navbarSupportedContent">
//           <Nav className="ms-auto my-lg-0 me-sm-0 my-sm-0">
//             <Nav.Item className="px-2">
//               <Link
//                     className="nav-link text-black fs-5 px-3 my-2"
//                     to="/"
//               >
//                 Trang Chủ
//               </Link>
//             </Nav.Item>
//             {isLoggedIn ? (
//               <>
//                 {/* <Nav.Item className="px-2">
//                   <Link
//                     className="nav-link text-black fs-5 px-3 my-2"
//                     to="/profile"
//                   >
//                     Xin chào, {username}
//                   </Link>
//                 </Nav.Item> */}
//                 <Nav.Item className="px-2">
//                   <button onClick={handleLogout} className="nav-link text-black fs-5 px-3 my-2">
//                     <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
//                   </button>
//                 </Nav.Item>
//               </>
//             ) : (
//               <>
//                 <Nav.Item className="px-2">
//                   <Link
//                     className="nav-link text-black fs-5 px-3 my-2"
//                     to="/signup"
//                   >
//                     Đăng Ký
//                   </Link>
//                 </Nav.Item>
//                 <Nav.Item className="px-2">
//                   <Link
//                     className="nav-link text-black fs-5 px-3 my-2"
//                     to="/login"
//                   >
//                     Đăng Nhập
//                   </Link>
//                 </Nav.Item>
//               </>
//             )}
//             <Nav.Item className="px-2">
//               <Link
//                 className="nav-link text-black fs-5 px-3 my-2 d-none d-lg-block"
//                 to="#"
//               >
//                 <i className="fa-regular fa-user"></i>
//               </Link>
//               <Link
//                 className="nav-link text-black fs-5 px-3 my-2 d-lg-none"
//                 to="#"
//               >
//                 Tài Khoản
//               </Link>
//             </Nav.Item>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported

export default function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // Sử dụng navigate để chuyển hướng

  useEffect(() => {
    // Kiểm tra token khi trang được load
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Nếu có token thì đã đăng nhập
    } else {
      setIsLoggedIn(false); // Không có token thì chưa đăng nhập
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Thay thế bằng endpoint đăng xuất thực tế của bạn
      const response = await axios.post('http://localhost:8080/taiKhoan/dangXuat');
      localStorage.removeItem('token'); // Xóa token khỏi localStorage
      setIsLoggedIn(false); // Cập nhật trạng thái đăng xuất
      navigate('/login'); // Chuyển hướng tới trang đăng nhập
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
              <Link className="nav-link text-black fs-5 px-3 my-2" to="/">
                Trang Chủ
              </Link>
            </Nav.Item>
            {isLoggedIn ? (
              <>
                {/* Hiển thị nút "Đăng Xuất" khi đã đăng nhập */}
                <Nav.Item className="px-2">
                  <button onClick={handleLogout} className="nav-link text-black fs-5 px-3 my-2">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
                  </button>
                </Nav.Item>
                {/* Hiển thị icon tài khoản khi đã đăng nhập */}
                <Nav.Item className="px-2">
                  <Link className="nav-link text-black fs-5 px-3 my-2" to="/profile">
                    <i className="fa-regular fa-user"></i>
                  </Link>
                </Nav.Item>
              </>
            ) : (
              <>
                {/* Hiển thị "Đăng Nhập" và "Đăng Ký" khi chưa đăng nhập */}
                <Nav.Item className="px-2">
                  <Link className="nav-link text-black fs-5 px-3 my-2" to="/signup">
                    Đăng Ký
                  </Link>
                </Nav.Item>
                <Nav.Item className="px-2">
                  <Link className="nav-link text-black fs-5 px-3 my-2" to="/login">
                    Đăng Nhập
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
