import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Menu icon for opening sidebar
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
    return (
        <AppBar position="fixed">
            <Toolbar style={{backgroundColor:'white',color:'black'}}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleSidebar}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Logo or Title */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
