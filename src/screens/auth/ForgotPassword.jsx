import React, { useState } from "react";
import { TextField, Button, Typography, Snackbar } from "@mui/material";
import './ForgotPassword.css';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import authApi from "../../api/AuthApi.js";
import AlertDialogBox from '../../components/AlertDialogBox.jsx';



const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [dialogState, setDialogState] = useState({
        open: false,
        message: '',
    });
    const send = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailPattern.test(email)) {
            setDialogState({
                open: true,
                message: 'Please enter a valid email address',
            });
            return;
        }

        try {
            setErrorMessage("");
            const response = await authApi.forgotPassword({ email });
            setDialogState({
                open: true,
                message: `Instructions have been sent to ${email}.`,
            });
            setEmail('');
        } catch (error) {
            setDialogState({
                open: true,
                message: `Error Occurred`,
            });
        }
    }

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

                <AlertDialogBox
                    open={dialogState.open}
                    message={dialogState.message}
                    onClose={() => setDialogState({ open: false, message: '' })} // Close dialog
                />
            </div>
        </div>
    );
}

export default ForgotPassword;
