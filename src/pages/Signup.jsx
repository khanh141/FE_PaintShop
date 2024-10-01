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
import { faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';

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
                    <MDBInput placeholder='Your Name' id='form1' type='text' className='w-100'/>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FontAwesomeIcon className='iconSignup' icon={faEnvelope} fas size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Your Email' id='form2' type='email'/>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FontAwesomeIcon className='iconSignup' icon={faLock} size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Password' id='form3' type='password'/>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FontAwesomeIcon className='iconSignup' icon={faKey} size='lg' style={{ paddingRight: '10px' }}/>
                    <MDBInput placeholder='Repeat your password' id='form4' type='password'/>
                  </div>
                  {/* <div className='mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                  </div> */}
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