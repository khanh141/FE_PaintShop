import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ASIDE_NAV } from '~/constants';
import { Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GoSignOut } from 'react-icons/go';
import { FaBars } from 'react-icons/fa';
import { MdHome } from 'react-icons/md';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Logout } from '~/services';
import { KEYS } from '~/constants/keys';
import { clearUser } from '~/redux/UserSlice';
const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sidebarVariants = {
        true: {
            left: '0',
        },
        false: {
            left: '-60%',
        },
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage

        if (!token) {
            console.error('Token is missing');
            return;
        }

        try {
            const response = await Logout(token);
            if (response.status === 200) {
                localStorage.removeItem('token');
                dispatch(clearUser()); // Reset Redux state
            }
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
        }
    };

    return (
        <Col
            sm={12}
            md={12}
            lg={2}
            xl={2}
            className="SidebarContainer pt-5 px-0"
        >
            <div
                className="bars"
                style={expanded ? { left: '60%' } : { left: '5%' }}
                onClick={() => setExpanded(!expanded)}
            >
                <FaBars />
            </div>
            <motion.div
                className="sidebar"
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                <div className="menu">
                    {ASIDE_NAV.map((item, index) => (
                        <Nav.Link
                            key={index}
                            // href={item.path}
                            className={`text-black fs-5 rounded-pill ps-3 my-2 menuItem ${
                                selected === index
                                    ? 'menuItem active'
                                    : 'menuItem'
                            }`}
                            aria-current="page"
                            onClick={() => {
                                setSelected(index);
                                navigate(item.path);
                            }}
                        >
                            <item.icon />
                            <span>{item.title}</span>
                        </Nav.Link>
                    ))}
                    <div className="bottomMenu">
                        <span
                            className="item"
                            onClick={() => {
                                handleLogout();
                                navigate('/');
                            }}
                        >
                            <GoSignOut /> Đăng xuất
                        </span>

                        <span className="item" onClick={() => navigate('/')}>
                            <MdHome /> Trang chủ
                        </span>
                    </div>
                </div>
            </motion.div>
        </Col>
    );
};

export default Sidebar;
