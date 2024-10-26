import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>
            <div className="vw-100 ">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
