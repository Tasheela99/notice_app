import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Snackbar } from "@mui/material";
import './Login.css';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    ;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Please fill in all fields");
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = response.data;
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || "Login failed");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
            setSnackbarOpen(true);
            console.error("Login error:", error);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="login-outer">
            <div className="login-inner">
                <Typography variant="h4" component="h1" className="login-title">
                    LOGIN
                </Typography>
                <Divider className="divider"></Divider>
                <Typography className="login-subtitle">
                    Log in with your billage account
                </Typography>
                <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    margin="none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    className="text-field"
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="dense"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="login-button"
                    onClick={login}
                >
                    Log In
                </Button>
                <Link to="/authentication/forgot-password" className="forgot-password">
                    Forgot your password?
                </Link>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="register-button"
                >
                    <Link to="/authentication/register" className="register-link">
                        New member registration
                    </Link>
                </Button>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={errorMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centering the Snackbar
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </div>
    );
}

export default Login;
