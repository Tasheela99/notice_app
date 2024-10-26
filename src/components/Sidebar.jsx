import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemText, ListItemButton } from '@mui/material';

const Sidebar = ({ isVisible, toggleSidebar }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        toggleSidebar(); // Optionally close the sidebar on selection
    };

    return (
        <Drawer
            anchor="left"
            open={isVisible}
            onClose={toggleSidebar}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 250,
                    color: '#000000',
                    backgroundColor: '#fff',
                },
            }}
        >
            <div className="p-3" style={{ backgroundColor: 'white', color: 'black' }}>
                <List component="nav" style={{ backgroundColor: 'white', color: 'black' }}>
                    <ListItemButton
                        onClick={() => handleItemClick('allNotices')}
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            border: selectedItem === 'allNotices' ? '2px solid black' : '1px solid transparent',
                        }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="All Notices" />
                        </Link>
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => handleItemClick('announcements')}
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            border: selectedItem === 'announcements' ? '2px solid black' : '1px solid transparent',
                        }}
                    >
                        <Link to="/dashboard/announcements" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="Announcements" />
                        </Link>
                    </ListItemButton>
                </List>
            </div>
        </Drawer>
    );
};

export default Sidebar;
