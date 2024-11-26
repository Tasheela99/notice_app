import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const userState = useSelector((state)=> state.auth)
    return (
        <div>
            <div className="vw-100 ">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
