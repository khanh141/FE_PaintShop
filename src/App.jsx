import Home from "./pages/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import Login from "./pages/Login.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminProduct from "./pages/AdminProduct.jsx";
import AdminImpExp from "./pages/AdminImpExp.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ProductDetail from './pages/ProductDetail.jsx';
import "./assets/CSS/Body.scss";
import "./assets/CSS/Header.scss";
import "./assets/CSS/Footer.scss";
import WarehousePage from "./pages/WarehousePage.jsx";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* localhost/ */}
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            {/* localhostsignup */}
            <Route path="signup" element={<Signup />} />
            {/* localhost/login */}
            <Route path="login" element={<Login />} />
            {/* <Route path='/product/:productId' element={<ProductDetail />}></Route> */}
            <Route path='/productDetail' element={<ProductDetail />}></Route>
          </Route>

          {/* localhost/admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="import-export" element={<AdminImpExp />} />
            <Route path="warehouse" element={<WarehousePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
