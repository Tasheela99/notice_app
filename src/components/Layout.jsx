import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx'; // MUI Sidebar

const Layout = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
    };

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            <main style={{ marginLeft: isSidebarVisible ? '250px' : '0', padding: '80px 20px 20px', transition: 'margin-left 0.3s ease', width: '100%' }}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
