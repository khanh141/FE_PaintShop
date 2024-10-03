import { Link } from "react-router-dom";
import { ASIDE_NAV } from "../constants";

function Aside() {
  return (
    <aside>
      <ul>
        {ASIDE_NAV.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Aside;
