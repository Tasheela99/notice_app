import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Avatar,
    IconButton,
    Typography, InputLabel, MenuItem, FormControl, Select, Divider,
} from '@mui/material';
import {AccountCircle, Close, PhotoCamera} from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import userApi from "../../api/UserApi.js";

function EditUserProfile({ open, onClose, onSave, editableDetails, onFieldChange,onAvatarChange }) {

    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleSave = async () => {
        try {
            const payload = {
                first_name: editableDetails.first_name,
                last_name: editableDetails.last_name,
                first_name_furigana: editableDetails.first_name_furigana,
                last_name_furigana: editableDetails.last_name_furigana,
                company_name: editableDetails.company_name,
                company_name_furigana: editableDetails.company_name_furigana,
                position: editableDetails.position,
                postcode: editableDetails.postcode,
                prefecture: editableDetails.prefecture,
                company_addr: editableDetails.company_addr,
                building: editableDetails.building,
                tel: editableDetails.tel,
                email: editableDetails.email,
                type_of_industry: editableDetails.type_of_industry,
                type: editableDetails.type
            };

            // Handle file upload separately
            const formData = new FormData();

            // Append text fields
            Object.keys(payload).forEach(key => {
                formData.append(key, payload[key] || '');
            });

            // Append file if exists
            if (editableDetails.profile_imageURL instanceof File) {
                formData.append('profile_imageURL', editableDetails.profile_imageURL);
            }

            const response = await userApi.update(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            onSave(response.data);
            onClose();
        } catch (error) {
            console.error('Profile update error:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
            onAvatarChange(event);
        }
    };




    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle variant="h5">Edit User Profile</DialogTitle>

            <DialogContent>
                <Divider sx={{ mb: 3 }} />
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mr: 3,
                            bgcolor: 'primary.main',
                        }}
                        src={avatarPreview || editableDetails.profile_imageURL || ''}
                    >
                        {!editableDetails.profile_imageURL && !avatarPreview && <AccountCircle sx={{ width: 60, height: 60 }} />}
                    </Avatar>
                    <Box>
                        <Typography variant="h5">
                            {editableDetails.first_name || 'First Name'} {editableDetails.last_name || 'Last Name'}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {editableDetails.position || 'Position'}
                        </Typography>
                    </Box>
                    <IconButton color="primary" component="label" sx={{ ml: 'auto' }}>
                        <PhotoCamera />
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleAvatarChange}
                        />
                    </IconButton>
                </Box>
                <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name"
                        name="first_name"
                        value={editableDetails.first_name || ''}
                        onChange={onFieldChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        name="last_name"
                        value={editableDetails.last_name || ''}
                        onChange={onFieldChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name (Furigana)"
                        name="first_name_furigana"
                        value={editableDetails.first_name_furigana || ''}
                        onChange={onFieldChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Name (Furigana)"
                        name="last_name_furigana"
                        value={editableDetails.last_name_furigana || ''}
                        onChange={onFieldChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Telephone"
                        name="tel"
                        value={editableDetails.tel || ''}
                        onChange={onFieldChange}
                    />
                </Box>
                <DialogActions>
                    <Button onClick={onClose} variant="outlined" color="error" startIcon={<CloseIcon />}>
                        Close
                    </Button>
                    <Button
                        onClick={handleSave}
                        color="primary"
                        variant="outlined"
                        startIcon={<SaveIcon />}
                    >
                        Save Profile
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default EditUserProfile;
