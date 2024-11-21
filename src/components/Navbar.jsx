import React, {useEffect} from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ toggleSidebar, user }) => {
    useEffect(() => {
        console.log(localStorage.getItem("userData"))
        console.log(user)
    }, []);

    return (
        <AppBar position="fixed">
            <Toolbar style={{ backgroundColor: 'white', color: 'black' }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleSidebar}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Title */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>

                {/* User Info */}
                {user && (
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="body1" color="inherit">
                            {user.first_name} {user.last_name}
                        </Typography>
                        <Avatar
                            alt={`${user.first_name} ${user.last_name}`}
                            src={user.profile_imageURL || 'https://via.placeholder.com/150'}
                            sx={{ width: 40, height: 40 }}
                        />
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
