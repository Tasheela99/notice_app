import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Snackbar } from "@mui/material";
import './ForgotPassword.css'; // External CSS for styling
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" or "error"

    const send = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailPattern.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            setSnackbarSeverity("error");
            setSnackbarMessage("Please enter a valid email address.");
            setSnackbarOpen(true);
            return;
        }

        try {
            setErrorMessage("");
            const response = await axios.post("http://localhost:5000/api/v1/auth/forgot-password", { email });
            setSnackbarSeverity("success");
            setSnackbarMessage(`Instructions have been sent to ${email}.`);
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarSeverity("error");
            setSnackbarMessage("Failed to send instructions. Please try again later.");
            setSnackbarOpen(true);
            console.error("Forgot Password error:", error);
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="login-outer">
            <div className="login-inner">
                <Typography variant="h4" component="h1" className="login-title">
                    Forgot Password
                </Typography>
                <Divider className="divider divider-padding"></Divider>
                <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    margin="none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="login-button"
                    onClick={send}
                >
                    Send
                </Button>
                <Link to="/authentication/login" className="forgot-password">
                    Back To Login
                </Link>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centering the Snackbar
                sx={{
                    position: 'absolute', // Positioning it absolutely
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)' // Adjusting position to be centered
                }}
            />
        </div>
    );
}

export default ForgotPassword;
