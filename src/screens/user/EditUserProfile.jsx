import React from 'react';
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

function EditUserProfile({ open, onClose, onSave, editableDetails, onFieldChange, onAvatarChange }) {
    const handleSave = async () => {
        try {
            const formData = new FormData();
            for (const key in editableDetails) {
                formData.append(key, editableDetails[key]);
            }

            if (editableDetails.avatar instanceof File) {
                formData.append('avatar', editableDetails.avatar);
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
            alert('Failed to update profile. Please try again.');
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
                        src={editableDetails.avatar || ''}
                    >
                        {!editableDetails.avatar && <AccountCircle sx={{ width: 60, height: 60 }} />}
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
                            onChange={onAvatarChange}
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
                        label="Company Name"
                        name="company_name"
                        value={editableDetails.company_name || ''}
                        onChange={onFieldChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Company Name (Furigana)"
                        name="company_name_furigana"
                        value={editableDetails.company_name_furigana || ''}
                        onChange={onFieldChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Position</InputLabel>
                        <Select
                            label="Position"
                            name="position"
                            value={editableDetails.position || ''}
                            onChange={onFieldChange}
                        >
                            <MenuItem defaultValue="Please_select">Please Select</MenuItem>
                            <MenuItem value="Executive">Executive</MenuItem>
                            <MenuItem value="Executive_Class">Executive Class</MenuItem>
                            <MenuItem value="Headquarters_Chief_Class">
                                Headquarters Chief Class
                            </MenuItem>
                            <MenuItem value="Manager_Class">Manager Class</MenuItem>
                            <MenuItem value="Section_Manager_Class">
                                Section Manager Class
                            </MenuItem>
                            <MenuItem value="Section_Chief_Chief_Class">
                                Section Chief/ Chief Class
                            </MenuItem>
                            <MenuItem value="Regular_Employee">Regular Employee</MenuItem>
                            <MenuItem value="Temporary_Employee">Temporary Employee</MenuItem>
                            <MenuItem value="Contract_Contract_Employee">
                                Contract/Contract Employee
                            </MenuItem>
                            <MenuItem value="Freelance">Freelance</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Postcode"
                        name="postcode"
                        value={editableDetails.postcode || ''}
                        onChange={onFieldChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Prefecture</InputLabel>
                        <Select
                            label="Prefecture"
                            name="prefecture"
                            value={editableDetails.prefecture || ''}
                            onChange={onFieldChange}
                        >
                            <MenuItem value="hokkaido">Hokkaido</MenuItem>
                            <MenuItem value="aomori">Aomori Prefecture</MenuItem>
                            <MenuItem value="iwate">Iwate Prefecture</MenuItem>
                            <MenuItem value="miyagi">Miyagi Prefecture</MenuItem>
                            <MenuItem value="akita">Akita Prefecture</MenuItem>
                            <MenuItem value="yamagata">Yamagata Prefecture</MenuItem>
                            <MenuItem value="fukushima">Fukushima Prefecture</MenuItem>
                            <MenuItem value="ibaraki">Ibaraki Prefecture</MenuItem>
                            <MenuItem value="tochigi">Tochigi Prefecture</MenuItem>
                            <MenuItem value="gunma">Gunma Prefecture</MenuItem>
                            <MenuItem value="saitama">Saitama Prefecture</MenuItem>
                            <MenuItem value="chiba">Chiba Prefecture</MenuItem>
                            <MenuItem value="tokyo">Tokyo</MenuItem>
                            <MenuItem value="kanagawa">Kanagawa Prefecture</MenuItem>
                            <MenuItem value="niigata">Niigata Prefecture</MenuItem>
                            <MenuItem value="toyama">Toyama Prefecture</MenuItem>
                            <MenuItem value="ishikawa">Ishikawa Prefecture</MenuItem>
                            <MenuItem value="fukui">Fukui Prefecture</MenuItem>
                            <MenuItem value="yamanashi">Yamanashi Prefecture</MenuItem>
                            <MenuItem value="nagano">Nagano Prefecture</MenuItem>
                            <MenuItem value="gifu">Gifu Prefecture</MenuItem>
                            <MenuItem value="shizuoka">Shizuoka Prefecture</MenuItem>
                            <MenuItem value="aichi">Aichi Prefecture</MenuItem>
                            <MenuItem value="mie">Mie Prefecture</MenuItem>
                            <MenuItem value="shiga">Shiga Prefecture</MenuItem>
                            <MenuItem value="kyoto">Kyoto Prefecture</MenuItem>
                            <MenuItem value="osaka">Osaka Prefecture</MenuItem>
                            <MenuItem value="hyogo">Hyogo Prefecture</MenuItem>
                            <MenuItem value="nara">Nara Prefecture</MenuItem>
                            <MenuItem value="wakayama">Wakayama Prefecture</MenuItem>
                            <MenuItem value="tottori">Tottori Prefecture</MenuItem>
                            <MenuItem value="shimane">Shimane Prefecture</MenuItem>
                            <MenuItem value="okayama">Okayama Prefecture</MenuItem>
                            <MenuItem value="hiroshima">Hiroshima Prefecture</MenuItem>
                            <MenuItem value="yamaguchi">Yamaguchi Prefecture</MenuItem>
                            <MenuItem value="tokushima">Tokushima Prefecture</MenuItem>
                            <MenuItem value="kagawa">Kagawa Prefecture</MenuItem>
                            <MenuItem value="ehime">Ehime Prefecture</MenuItem>
                            <MenuItem value="kochi">Kochi Prefecture</MenuItem>
                            <MenuItem value="fukuoka">Fukuoka Prefecture</MenuItem>
                            <MenuItem value="saga">Saga Prefecture</MenuItem>
                            <MenuItem value="nagasaki">Nagasaki Prefecture</MenuItem>
                            <MenuItem value="kumamoto">Kumamoto Prefecture</MenuItem>
                            <MenuItem value="oita">Oita Prefecture</MenuItem>
                            <MenuItem value="miyazaki">Miyazaki Prefecture</MenuItem>
                            <MenuItem value="kagoshima">Kagoshima Prefecture</MenuItem>
                            <MenuItem value="okinawa">Okinawa Prefecture</MenuItem>
                            <MenuItem value="abroad">abroad</MenuItem>
                            {/* Add other prefectures here */}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Company Address"
                        name="company_addr"
                        value={editableDetails.company_addr || ''}
                        onChange={onFieldChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Building"
                        name="building"
                        value={editableDetails.building || ''}
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
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        value={editableDetails.email || ''}
                        onChange={onFieldChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Industry</InputLabel>
                        <Select
                            name="type_of_industry"
                            value={editableDetails.type_of_industry || ""}
                            onChange={onFieldChange}
                            label="Industry"
                        >
                            <MenuItem defaultValue="Please_select">Please Select</MenuItem>
                            <MenuItem value="manufacturer">Manufacturer</MenuItem>
                            <MenuItem value="wholesale_retail">Wholesale and Retail</MenuItem>
                            <MenuItem value="it_communications_internet">
                                IT, Communications, and Internet
                            </MenuItem>
                            <MenuItem value="hr_outsourcing">
                                Human Resources/Outsourcing
                            </MenuItem>
                            <MenuItem value="entertainment_leisure">
                                Entertainment, Amusement and Leisure
                            </MenuItem>
                            <MenuItem value="accommodation_food">Accommodation and Food</MenuItem>
                            <MenuItem value="barber_beauty_salon">
                                Barber, Beauty Salon, Esthetic Salon
                            </MenuItem>
                            <MenuItem value="real_estate_construction_facilities">
                                Real Estate, Construction and Facilities
                            </MenuItem>
                            <MenuItem value="finance_insurance">Finance and Insurance</MenuItem>
                            <MenuItem value="consulting_services">
                                Professional Services/Consulting
                            </MenuItem>
                            <MenuItem value="media_advertising_design">
                                Media, Advertising, Design
                            </MenuItem>
                            <MenuItem value="logistics_transportation">
                                運輸・交通・物流・倉庫 (Transportation/Logistics/Warehousing)
                            </MenuItem>
                            <MenuItem value="environment_energy_science">
                                Environment, Energy and Science
                            </MenuItem>
                            <MenuItem value="medical_welfare">Medical and Welfare</MenuItem>
                            <MenuItem value="service">Service</MenuItem>
                            <MenuItem value="public_institutions_education">
                                Public Institutions and Education
                            </MenuItem>
                            <MenuItem value="others">Others</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Job Type</InputLabel>
                        <Select
                            name="type"
                            value={editableDetails.type || ""}
                            onChange={onFieldChange}
                            label="Job Type"
                        >
                            <MenuItem defaultValue="Please_select">Please Select</MenuItem>
                            <MenuItem value="owners_executive">Owners/Executive</MenuItem>
                            <MenuItem value="coorporate_palling">Coorporate Planning</MenuItem>
                            <MenuItem value="general_affairs">
                                Genaral Affairs/ Human Resources
                            </MenuItem>
                            <MenuItem value="finance">Finance/Accounting</MenuItem>
                            <MenuItem value="information_processing">
                                Information processing/information systems
                            </MenuItem>
                            <MenuItem value="publicity_advertising">
                                Publicity/Advertising
                            </MenuItem>
                            <MenuItem value="planning_research_marketing">
                                Planning/Research/Marketing
                            </MenuItem>
                            <MenuItem value="sales">Sales/Sales</MenuItem>
                            <MenuItem value="production_manufacturing">
                                Production/Manufacturing
                            </MenuItem>
                            <MenuItem value="materials_purchasing">Materials/Purchasing</MenuItem>
                            <MenuItem value="delivery_logistics">Delivery/Logistics</MenuItem>
                            <MenuItem value="design_engineering">
                                技術/設計 (Engineering/Design)
                            </MenuItem>
                            <MenuItem value="research_development">Research/Development</MenuItem>
                            <MenuItem value="editing_production">
                                Editing/Compilation/Production
                            </MenuItem>
                            <MenuItem value="designer_web_ui_ux">
                                Designer (Web, UI/UX, App)
                            </MenuItem>
                            <MenuItem value="graphic_designer">Graphic Designer</MenuItem>
                            <MenuItem value="other_designers">Other Designers</MenuItem>
                            <MenuItem value="professional_architecture_engineering">
                                Professional (Architecture/Civil Engineering related)
                            </MenuItem>
                            <MenuItem value="professional_medical">
                                Professional (Medical related)
                            </MenuItem>
                            <MenuItem value="professional_accounting">
                                Professional (Accounting related)
                            </MenuItem>
                            <MenuItem value="professional_law">Professional (Law)</MenuItem>
                            <MenuItem value="professional_education">
                                Professional (Education-related)
                            </MenuItem>
                            <MenuItem value="investor_entrepreneur">
                                Investor/Entrepreneur
                            </MenuItem>
                            <MenuItem value="others">Others</MenuItem>

                        </Select>
                    </FormControl>
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
