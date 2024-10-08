import { Col } from "react-bootstrap";
import OrderTables from "../components/Order";

function Dashboard() {
  
  return (
    <Col sm={12} md={12} lg={10} xl={10}>
    <div>
      <h1 className="text-center mb-5">Quản lý đơn hàng</h1>
      <OrderTables />
    </div>
  </Col>
  );
}

export default Dashboard;
