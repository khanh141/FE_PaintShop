import React, { useState } from 'react';
import { Row, Col, Form, FloatingLabel, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function EnterEmail() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState(''); // Success message state

    const handleEnterEmail = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/taiKhoan/quenMatKhau',
                { email }
            );
            setMessage(response.data);  // Set success message from API
            setErrors(''); // Clear errors if the call is successful
        } catch (error) {
            setErrors(error.response?.data || 'Something went wrong'); // Set error message
            setMessage(''); // Clear success message if there's an error
        }
    };

    return (
        <div id='enterEmail'>
            <Row className="mt-4 d-flex align-items-center justify-content-center ">
                <Col md={6}>
                    <Row className="p-4 border rounded-3 shadow-sm align-items-center justify-content-center flex-column authForm">
                        <h5 className="text-center fw-bold mb-4">Khôi phục mật khẩu</h5>
                        <div className="p-0 mb-2">
                            <FloatingLabel label="Email">
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FloatingLabel>
                        </div>

                        {/* Render success or error messages */}
                        {message && (
                            <Alert className="mt-1 w-100 text-center" variant="success">
                                {message}
                            </Alert>
                        )}
                        {errors && (
                            <Alert className="mt-1 w-100 text-center" variant="danger">
                                {errors}
                            </Alert>
                        )}

                        <Button
                            variant="primary"
                            className="mt-3 priColor"
                            style={{ width: '100px' }}
                            onClick={handleEnterEmail}
                        >
                            Gửi
                        </Button>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default EnterEmail;
