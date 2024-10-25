<Col xs={10} className="bg-light p-4 mainContent">
    <div id='tab1'>
        <h3>Hồ sơ của tôi</h3>
        <Row className="align-items-center mb-3">
            <Col style={{ flex: '0 0 30%' }} className="text-end">
                <span>Tên đăng nhập</span>
            </Col>
            <Col>
                <Form.Floating>
                    <Form.Control
                        type="text"
                        placeholder="Tên"
                        value={tenDangNhap}
                        disabled
                    />
                    <label>Tên đăng nhập</label>
                </Form.Floating>
            </Col>
            <Col style={{ width: '100px' }} className="text-center">
            </Col>
        </Row>

        <Row className="align-items-center mb-3">
            <Col style={{ flex: '0 0 30%' }} className="text-end">
                <span>Tên</span>
            </Col>
            <Col>
                <Form.Floating>
                    <Form.Control
                        type="text"
                        name="hoTen"
                        placeholder="Tên"
                        value={formData.hoTen}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <label>Tên</label>
                </Form.Floating>
            </Col>
            <Col style={{ width: '100px' }} className="text-center">
                <Button variant="outline-secondary">Info</Button>
            </Col>
        </Row>

        <Row className="align-items-center mb-3">
            <Col style={{ flex: '0 0 30%' }} className="text-end">
                <span>Email</span>
            </Col>
            <Col>
                <Form.Floating>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <label>Email</label>
                </Form.Floating>
            </Col>
            <Col style={{ width: '100px' }} className="text-center">
                <Button variant="outline-secondary">Info</Button>
            </Col>
        </Row>

        {/* Add other fields similarly */}

        <Button
            variant="primary"
            onClick={isEditing ? handleSave : handleEdit}
        >
            {isEditing ? 'Lưu' : 'Chỉnh sửa thông tin'}
        </Button>
    </div>
</Col>
