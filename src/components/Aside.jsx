import { Link } from "react-router-dom";
import { ASIDE_NAV } from "../constants";
import { Col, Nav } from 'react-bootstrap';
function Aside() {
  return (
    <Col  sm={12} md={12} lg={2} xl={2}>
    <aside>
      <ul>
        {ASIDE_NAV.map((item, index) => (
          <Nav.Link
            href={item.path}
            className="text-black fs-5 rounded-pill px-3 my-2"
            aria-current="page"
          >
            {item.title}
          </Nav.Link>
        ))}
      </ul>
    </aside>
    </Col>
  );
}

export default Aside;
