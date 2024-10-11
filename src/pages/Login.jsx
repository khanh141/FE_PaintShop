import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login(){
  const [tenDangNhap, setUsername] = useState('');
  const [matKhau, setPassword] = useState('');
  const navigate = useNavigate(); // Dùng để điều hướng người dùng

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/taiKhoan/dangNhap",
        {
          tenDangNhap,
          matKhau,
        }
      );

      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);

      // Điều hướng đến trang chính sau khi đăng nhập thành công
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };
  
    return (
      // <div>
      //   <MDBContainer fluid>
      //     <MDBCard className='text-black m-5' style={{borderRadius: '25px', borderStyle: 'none'}}>
      //       <MDBCardBody>
      //         <MDBRow>
      //           <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
      //             <h1 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng nhập</h1>
      //             <div className="d-flex flex-row align-items-center mb-4 mt-4">
      //               <FontAwesomeIcon  icon={faUser} fas size='lg' style={{ paddingRight: '10px' }}/>
      //               <MDBInput placeholder='Your Name' id='form1' type='text' className='w-100'/>
      //             </div>
      //             <div className="d-flex flex-row align-items-center mb-4">
      //               <FontAwesomeIcon  icon={faLock} size='lg' style={{ paddingRight: '10px' }}/>
      //               <MDBInput placeholder='Password' id='form3' type='password'/>
      //             </div>
      //             <div className='mb-4 d-flex align-items-start'>
      //               <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Nhớ mật khẩu' />
      //             </div>
      //             <MDBBtn className='mb-4' size='lg' onClick={handleLogin}>Đăng Nhập</MDBBtn>
      //           </MDBCol>
      //           <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
      //             <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
      //           </MDBCol>
      //         </MDBRow>
      //       </MDBCardBody>
      //     </MDBCard>
      //   </MDBContainer>
      // </div>
      <div>
        <MDBContainer fluid>
          <MDBCard
            className="text-black m-5"
            style={{ borderRadius: "25px", borderStyle: "none" }}
          >
            <MDBCardBody>
              <MDBRow>
                <MDBCol
                  md="10"
                  lg="6"
                  className="order-2 order-lg-1 d-flex flex-column align-items-center"
                >
                  <h1 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Đăng nhập
                  </h1>

                  <div className="d-flex flex-row align-items-center mb-4 mt-4">
                    <FontAwesomeIcon
                      icon={faUser}
                      fas
                      size="lg"
                      style={{ paddingRight: "10px" }}
                    />
                    <MDBInput
                      placeholder="Tên đăng nhập"
                      id="form1"
                      type="text"
                      className="w-100"
                      value={tenDangNhap}
                      onChange={(e) => setUsername(e.target.value)} // Cập nhật state khi nhập
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <FontAwesomeIcon
                      icon={faLock}
                      size="lg"
                      style={{ paddingRight: "10px" }}
                    />
                    <MDBInput
                      placeholder="Mật khẩu"
                      id="form3"
                      type="password"
                      value={matKhau}
                      onChange={(e) => setPassword(e.target.value)} // Cập nhật state khi nhập
                    />
                  </div>

                  <div className="mb-4 d-flex align-items-start">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckDefault"
                      label="Nhớ mật khẩu"
                    />
                  </div>

                  <MDBBtn className="mb-4" size="lg" noRipple onClick={handleLogin}>
                    Đăng Nhập
                  </MDBBtn>
                </MDBCol>

                <MDBCol
                  md="10"
                  lg="6"
                  className="order-1 order-lg-2 d-flex align-items-center"
                >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    fluid
                  />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    );
}