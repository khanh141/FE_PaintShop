import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ASIDE_NAV } from '~/constants';
import { Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GoSignOut } from 'react-icons/go';
import { FaBars } from 'react-icons/fa';
import { MdHome } from "react-icons/md";
const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();
    const sidebarVariants = {
        true: {
            left: '0',
        },
        false: {
            left: '-60%',
        },
    };

    const handleLogout = async () => {
        console.log("logout right here")
    };

    return (
        <Col sm={12} md={12} lg={2} xl={2} className="SidebarContainer pt-5 px-0">
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
                            className={`text-black fs-5 rounded-pill ps-3 my-2 menuItem ${selected === index
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
                        <span className='item'
                            onClick={handleLogout}
                        > <GoSignOut /> Đăng xuất</span>
                        <span className='item'
                            onClick={() => navigate('/')}
                        ><MdHome /> Trang chủ</span>
                    </div>
                </div>
            </motion.div>
        </Col>
    );
};

export default Sidebar;
