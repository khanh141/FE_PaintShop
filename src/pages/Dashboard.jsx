import { Col } from 'react-bootstrap';
import OrderTables from '../components/Order';
import Cards from '~/components/Cards/Cards';

function Dashboard() {
    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <div>
                <h1 className="text-center mb-5">Dash Board</h1>
                <Cards />
                {/* <OrderTables /> */}
            </div>
        </Col>
    );
}

export default Dashboard;
