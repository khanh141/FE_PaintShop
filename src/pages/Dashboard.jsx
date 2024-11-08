import { Col } from 'react-bootstrap';
import OrderTables from '../components/Order';
import Cards from '~/components/Cards/Cards';
import Table from '../components/TableDaboard';

function Dashboard() {
    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <div>
                <h1
                    style={{
                        fontSize: '2.5rem',
                        color: '#4a90e2', // Màu xanh dương
                        marginBottom: '2rem',
                        marginTop: '2rem',
                        textAlign: 'center',
                        paddingBottom: '0.5rem',
                        letterSpacing: '1px',
                        borderBottom: '2px solid #ccc',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                        background:
                            'linear-gradient(to right, #4a90e2, #50e3c2)',
                        WebkitBackgroundClip: 'text',
                    }}
                >
                    Dash Board
                </h1>
                <Cards />
                <Table />
                {/* <OrderTables /> */}
            </div>
        </Col>
    );
}

export default Dashboard;
