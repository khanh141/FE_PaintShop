import { Container, Row, Col, Image, Button } from 'react-bootstrap';
export default function Detail(){
    

    return (
        <Container>
        <Row>
          <Col md={6}>
            <Image src="path/to/your/image.jpg" fluid />
          </Col>
          <Col md={6}>
            <h2>iPhone 15 Pro Max</h2>
            <p>Thông tin chi tiết sản phẩm...</p>
            <Button variant="primary">Mua ngay</Button>
          </Col>
        </Row>
      </Container>
    );
}