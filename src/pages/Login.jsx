import React from 'react';
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


export default function Login(){
    return (
      <div>
        <MDBContainer fluid>
          <MDBCard className='text-black m-5' style={{borderRadius: '25px', borderStyle: 'none'}}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                  <h1 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng nhập</h1>
                  <div className="d-flex flex-row align-items-center mb-4 mt-4">
                    <FontAwesomeIcon  icon={faUser} fas size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Your Name' id='form1' type='text' className='w-100'/>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FontAwesomeIcon  icon={faLock} size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Password' id='form3' type='password'/>
                  </div>
                  <div className='mb-4 d-flex align-items-start'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Nhớ mật khẩu' />
                  </div>
                  <MDBBtn className='mb-4' size='lg'>Đăng Nhập</MDBBtn>
                </MDBCol>
                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                  <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>

        {/* <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
          />

          <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4">Sign in</MDBBtn>

          <div className="text-center">
            <p>
              Not a member? <a href="#!">Register</a>
            </p>
            <p>or sign up with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>
          </div>
        </MDBContainer> */}
      </div>
    );
}