import Home from './pages/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
import React, { useEffect } from 'react';
import Login from './pages/Login.jsx';
import DefaultLayout from './layouts/DefaultLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminProduct from './pages/AdminProduct.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import './assets/CSS/Body.scss';
import './assets/CSS/Header.scss';
import './assets/CSS/Footer.scss';
import WarehousePage from './pages/WarehousePage.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import Authentication from './pages/Authentication';
import EnterEmail from './components/EnterEmail.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from './redux/UserSlice';
import { jwtDecode } from 'jwt-decode';
import AdminAccount from './pages/AdminAccount.jsx';
import AdminOrder from './pages/AdminOrder.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PurchasePage from './pages/PurchasePage.jsx';
import axios from 'axios';
import { refreshToken } from './services/auth.service.js';

function App() {
    const dispatch = useDispatch();

    let refreshTimeout;
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken.exp > currentTime) {
                    dispatch(setUser(decodedToken.sub, decodedToken.scope));
                    setupTokenRefresh(decodedToken.exp);
                } else {
                    localStorage.removeItem('token');
                    dispatch(clearUser());
                }
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
                dispatch(clearUser());
            }
        }
    }, [dispatch]);

    // Setup token refresh logic
    const setupTokenRefresh = (expiredTime) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = expiredTime - currentTime;

        const refreshTime = remainingTime - 600; // Refresh 10 mins before expiration
        if (refreshTimeout) clearTimeout(refreshTimeout); // Avoid multiple timeouts

        if (refreshTime > 0) {
            refreshTimeout = setTimeout(refreshToken, refreshTime * 1000);
        }
    };

    const refreshToken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8080/taiKhoan/taoMoiToken',
                { token }
            );

            localStorage.setItem('token', response.data.token);
            const decodedToken = jwtDecode(response.data.token);
            dispatch(setUser(decodedToken.sub, decodedToken.scope));
            setupTokenRefresh(decodedToken.exp);
        } catch (error) {
            console.error('Token refresh failed:', error);
            localStorage.removeItem('token');
            dispatch(clearUser());
        }
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* localhost/ */}
                    <Route path="/" element={<DefaultLayout />}>
                        <Route index element={<Home />} />
                        {/* localhost/signup */}
                        <Route path="signup" element={<Signup />} />
                        {/* localhost/login */}
                        <Route path="login" element={<Login />} />
                        {/* localhost/cart */}
                        <Route path="cart" element={<ShoppingCart />} />
                        <Route path="purchase" element={<PurchasePage />} />
                        <Route
                            path="enterEmail"
                            element={
                                <Authentication>
                                    <EnterEmail />
                                </Authentication>
                            }
                        />
                        <Route
                            path="resetPassword"
                            element={
                                <Authentication>
                                    <ResetPassword />
                                </Authentication>
                            }
                        />
                        {/* <Route path='/product/:productId' element={<ProductDetail />}></Route> */}
                        <Route path="/productDetail/:maSanPham" element={<ProductDetail />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                    {/* localhost/admin */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="products" element={<AdminProduct />} />
                        <Route path="adminorder" element={<AdminOrder />} />
                        <Route path="warehouse" element={<WarehousePage />} />
                        <Route path="adminaccount" element={<AdminAccount />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
