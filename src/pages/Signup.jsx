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
import { faUser, faPhone, faLock, faKey, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Signup(){
    return (
        <MDBContainer fluid>
          <MDBCard className='text-black m-5 signup' style={{borderRadius: '25px'}}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                  <h1 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</h1>
                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <FontAwesomeIcon className='iconSignup' icon={faUser} fas size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Họ và tên' id='form1' type='text' className='w-100'/>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FontAwesomeIcon className='iconSignup' icon={faPhone} fas size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Số điện thoại' id='form2' type='text'/>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FontAwesomeIcon className='iconSignup' icon={faLocationDot} fas size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Địa chỉ' id='form2' type='text'/>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FontAwesomeIcon className='iconSignup' icon={faLock} size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Mật khẩu' id='form3' type='password'/>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FontAwesomeIcon className='iconSignup' icon={faKey} size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Nhập lại mật khẩu' id='form4' type='password'/>
                  </div>
                  <MDBBtn className='mb-4' size='lg'>Đăng Ký</MDBBtn>
                </MDBCol>
                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                  <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      );
}