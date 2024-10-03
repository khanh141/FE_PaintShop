import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";

function AdminLayout() {
  return (
    <div>
      <Aside />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
