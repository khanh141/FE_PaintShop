import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function DefaultLayout() {
    return <div className="layoutContainer">
        <Header />
        <div className="content">
            <Outlet />
        </div>
        <Footer />
    </div>
}

export default DefaultLayout;