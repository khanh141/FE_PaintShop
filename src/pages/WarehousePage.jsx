import { Col } from 'react-bootstrap';
import Warehouse from '../components/Warehouse';
export default function WarehousePage() {
    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <h1 className="text-center mb-5">Quản lý kho hàng</h1>
            <Warehouse />
        </Col>
    );
}
