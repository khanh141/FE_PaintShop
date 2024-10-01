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


export default function Login(){
    return (
        <div>
            <MDBContainer fluid>
          <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='12' lg='12' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                  <h1 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng nhập</h1>
                  <div className="d-flex flex-row align-items-center mb-4 ">
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
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        </div>
    );
}