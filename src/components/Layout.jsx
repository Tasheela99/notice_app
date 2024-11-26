import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import userApi from "../api/UserApi.js";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {  SETUSERPROFILE } from '../constants/AuthCons.jsx';

const Layout = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [user, setUser] = useState(null); // State to hold user data
    const dispatch = useDispatch()
    

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Retrieve token from cookies
                const token = Cookies.get('access_token');
                console.log(token)
                if (!token) {
                    console.log('No access token found. Please log in again.');
                }

                // Make the API call to fetch the user profile
                const response = await userApi.profile({
                   token
                });
                console.log(response.data)
                dispatch({ type: SETUSERPROFILE, payload:response.data })
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <>
            {/* Pass user data to Navbar */}
            <Navbar toggleSidebar={toggleSidebar} user={user} />
            <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            <main
                style={{
                    marginLeft: isSidebarVisible ? '250px' : '0',
                    padding: '80px 20px 20px',
                    transition: 'margin-left 0.3s ease',
                    width: '100%',
                }}
            >
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
