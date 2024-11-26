import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Box,
    Divider,
    Button,
    Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AccountCircle } from '@mui/icons-material';
import EditUserProfile from "./EditUserProfile.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import userApi from "../../api/UserApi.js";

function UserProfileDetails() {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editableDetails, setEditableDetails] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await userApi.profile({
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setUserDetails(response.data);
                setIsLoading(false); // Add this line
            } catch (error) {
                console.error('Error fetching user details', error);
                setIsLoading(false); // Add this line
            }
        };

        fetchUserDetails();
    }, []);

    const handleEditClick = () => {
        setEditableDetails(userDetails);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setEditableDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submit
    const handleSaveChanges = () => {
        // Here you can send the updated details to the server via an API call
        setUserDetails(editableDetails);
        setOpenDialog(false);
    };

    const formatValue = (key, value) => {
        const formatters = {
            position: {
                'Manager Class': 'Manager Class',
                Executive: 'Executive'
            },
            type_of_industry: {
                it_communications_internet: 'IT, Communications, and Internet'
            },
            type: {
                information_processing: 'Information Processing/Information Systems'
            }
        };

        return formatters[key]?.[value] || value || 'Not Provided';
    };

    const DetailRow = ({ label, value }) => (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={4}>
                <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
                    {label}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body1">
                    {formatValue(value.key, value.content)}
                </Typography>
            </Grid>
        </Grid>
    );

    if (isLoading || !userDetails) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20
                }}
            >
                <Typography variant="h4">Loading user details...</Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="xxl"
            sx={{
                position: 'absolute',
                top: 80,
                right: 0
            }}
        >
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5">User Profile</Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Personal Information
                </Typography>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mr: 3,
                            bgcolor: 'primary.main'
                        }}
                        src={userDetails.profile_imageURL || ''} // Use the profile_imageURL URL or fall back to empty string
                    >{!userDetails.profile_imageURL && <AccountCircle sx={{ width: 60, height: 60 }} />}
                    </Avatar>
                    <Box>
                        <Typography variant="h5">
                            {userDetails.first_name} {userDetails.last_name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {userDetails.position}
                        </Typography>
                    </Box>
                </Box>

                <DetailRow label="First Name" value={{ key: 'first_name', content: userDetails.first_name }} />
                <DetailRow label="Last Name" value={{ key: 'last_name', content: userDetails.last_name }} />
                <DetailRow
                    label="First Name (Furigana)"
                    value={{ key: 'first_name_furigana', content: userDetails.first_name_furigana }}
                />
                <DetailRow
                    label="Last Name (Furigana)"
                    value={{ key: 'last_name_furigana', content: userDetails.last_name_furigana }}
                />

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Company Information
                </Typography>
                <DetailRow
                    label="Company Name"
                    value={{ key: 'company_name', content: userDetails.company_name }}
                />
                <DetailRow
                    label="Company Name (Furigana)"
                    value={{ key: 'company_name_furigana', content: userDetails.company_name_furigana }}
                />
                <DetailRow label="Position" value={{ key: 'position', content: userDetails.position }} />

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Contact Information
                </Typography>
                <DetailRow label="Postal Code" value={{ key: 'postcode', content: userDetails.postcode }} />
                <DetailRow label="Prefecture" value={{ key: 'prefecture', content: userDetails.prefecture }} />
                <DetailRow label="Address" value={{ key: 'company_addr', content: userDetails.company_addr }} />
                <DetailRow label="Building" value={{ key: 'building', content: userDetails.building }} />
                <DetailRow label="Telephone" value={{ key: 'tel', content: userDetails.tel }} />
                <DetailRow label="Email" value={{ key: 'email', content: userDetails.email }} />

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Professional Details
                </Typography>
                <DetailRow
                    label="Industry"
                    value={{ key: 'type_of_industry', content: userDetails.type_of_industry }}
                />
                <DetailRow label="Job Type" value={{ key: 'type', content: userDetails.type }} />
                <Box display="flex" justifyContent="end" alignItems="end" mt={3}>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
                                // Logic to delete profile goes here
                                console.log('Profile deleted');
                            }
                        }}
                    >
                        Delete Profile
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        color="primary"
                        onClick={handleEditClick}
                    >
                        Edit Profile
                    </Button>
                </Box>

            </Paper>

            <EditUserProfile
                open={openDialog}
                onClose={handleCloseDialog}
                onSave={handleSaveChanges}
                editableDetails={editableDetails}
                onFieldChange={handleFieldChange}
            />
        </Container>
    );
}

export default UserProfileDetails;
