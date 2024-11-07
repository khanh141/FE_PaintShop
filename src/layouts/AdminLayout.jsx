import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import '../assets/css/App.css';

function AdminLayout() {
    return (
        // <div>
        //     <Row style={{ margin: '0 auto' }}>
        //         <Aside />
        //         {/* <Sidebar /> */}
        //         <Outlet />
        //     </Row>
        // </div>

        <div className="AppGlass">
            <Row style={{ margin: '0 auto' }}>
                <Sidebar />
                <Outlet />
            </Row>
        </div>
    );
}

export default AdminLayout;
