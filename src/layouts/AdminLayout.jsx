import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';
import { Row } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

function AdminLayout() {
    return (
        <div>
            <Row>
                <Aside />
                {/* <Sidebar /> */}
                <Outlet />
            </Row>
        </div>
    );
}

export default AdminLayout;
