import React, { useState } from 'react';
import '../assets/css/SiderBar.scss'; // Ensure the path is correct
import { UilSignOutAlt, UilBars } from '@iconscout/react-unicons'; // Make sure this import works
import { motion } from 'framer-motion';
import { ASIDE_NAV } from '~/constants'; // Ensure this is the correct path
import { Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true); // Fixed typo from setExpaned to setExpanded
    const navigate = useNavigate();
    const sidebarVariants = {
        true: {
            left: '0',
        },
        false: {
            left: '-60%',
        },
    };

    return (
        <Col sm={12} md={12} lg={2} xl={2} className="SidebarContainer">
            <div
                className="bars"
                style={expanded ? { left: '60%' } : { left: '5%' }}
                onClick={() => setExpanded(!expanded)} // Fixed typo here as well
            >
                <UilBars />
            </div>
            <motion.div
                className="sidebar"
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                {/* Uncomment if you want to display a logo */}
                {/* <div className="logo">
                    <img src={Logo} alt="logo" />
                    <span>
                        Sh<span>o</span>ps
                    </span>
                </div> */}

                <div className="menu">
                    {ASIDE_NAV.map((item, index) => (
                        // <div
                        //     className={
                        //         selected === index
                        //             ? 'menuItem active'
                        //             : 'menuItem'
                        //     }
                        //     key={index}
                        //     onClick={() => setSelected(index)}
                        // >
                        //     <item.icon />
                        //     <span>{item.title}</span>
                        // </div>
                        <Nav.Link
                            key={index}
                            // href={item.path}
                            className={`text-black fs-5 rounded-pill px-3 my-2 menuItem ${
                                selected === index ? 'active' : ''
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
                    {/* Sign-out Icon */}
                    <div className="menuItem" onClick={() => navigate('/')}>
                        <UilSignOutAlt />
                    </div>
                </div>
            </motion.div>
        </Col>
    );
};

export default Sidebar;
