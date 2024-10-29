import React, { useState } from 'react';
import '../assets/css/SiderBar.css'; // Ensure the path is correct
// import Logo from '../imgs/logo.png'; // Uncomment if you use a logo
import { UilSignOutAlt, UilBars } from '@iconscout/react-unicons'; // Make sure this import works
import { motion } from 'framer-motion';
import { ASIDE_NAV } from '~/constants'; // Ensure this is the correct path

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
        <>
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
                        <div
                            className={
                                selected === index
                                    ? 'menuItem active'
                                    : 'menuItem'
                            }
                            key={index}
                            onClick={() => setSelected(index)}
                        >
                            <item.icon />
                            <span>{item.title}</span>
                        </div>
                    ))}
                    {/* Sign-out Icon */}
                    {/* <div className="menuItem">
                        <UilSignOutAlt />
                    </div> */}
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;
