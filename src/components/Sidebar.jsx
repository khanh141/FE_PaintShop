import React, { useState } from 'react';
// <<<<<<< HEAD
import '../assets/css/SiderBar.scss'; // Ensure the path is correct
// =======
// import '../assets/css/SiderBar.css'; // Ensure the path is correct
// >>>>>>> e6c0a3c479e3dcf67a32b0ea335d996aa05dd054
// import Logo from '../imgs/logo.png'; // Uncomment if you use a logo
import { UilSignOutAlt, UilBars } from '@iconscout/react-unicons'; // Make sure this import works
import { motion } from 'framer-motion';
import { ASIDE_NAV } from '~/constants'; // Ensure this is the correct path
import { Col, Nav } from 'react-bootstrap';

const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true); // Fixed typo from setExpaned to setExpanded

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
                            href={item.path}
                            className={`text-black fs-5 rounded-pill px-3 my-2 menuItem ${
                                selected === index ? 'active' : ''
                            }`}
                            aria-current="page"
                            onClick={() => setSelected(index)}
                        >
                            <item.icon />
                            <span>{item.title}</span>
                        </Nav.Link>
                    ))}
                    {/* Sign-out Icon */}
                    <div className="menuItem">
                        <UilSignOutAlt />
                    </div>
                </div>
            </motion.div>
        </Col>
    );
};

export default Sidebar;
