import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";
import {Row} from "react-bootstrap";

function AdminLayout() {
  return (
    <div>
      <Row>
      <Aside />
      <Outlet />
      </Row>
    </div>
  );
}

export default AdminLayout;
