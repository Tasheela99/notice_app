import React, {useState} from 'react';
import {
    Container,
    Typography,
    TextField,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Box,
    Alert
} from '@mui/material';
import axios from 'axios';
import './Register.css';

import Divider from "@mui/material/Divider";

function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        first_name_furigana: '',
        last_name_furigana: '',
        prefecture: '',
        postcode: '',
        type_of_industry: '',
        type: '',
        tel: '',
        company_addr: '',
        building: '',
        company_name: '',
        company_name_furigana: '',
        position: '',
        email: '',
        password: '',
        agree: false,
    });

    const [verificationCodeSent, setVerificationCodeSent] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'agree' ? checked : value
        }));
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!formData.last_name) newErrors.surname = 'Surname is required';
        if (!formData.first_name) newErrors.name = 'Name is required';
        if (!formData.email || !emailRegex.test(formData.email))
            newErrors.email = 'Please enter a valid email';
        if (!formData.password || !passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendVerificationCode = async () => {
        if (formData.email && !errors.email) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/send-mail-to-verify`,
                    {email: formData.email}
                );
                if (response.data.success) {
                    setVerificationCodeSent(true);
                    setVerificationCode(response.data.verificationCode);
                    alert(`Verification code sent to ${formData.email}`);
                }
            } catch (error) {
                alert('Failed to send verification code. Please try again.');
            }
        } else {
            alert('Please enter a valid email before sending a verification code.');
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCodeSent) {
            alert('Please request a verification code first.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/verify-mail`, {
                email: formData.email,
                code: enteredCode,
            });

            if (response.data.success) {
                setEmailConfirmed(true);
                alert('Email successfully verified!');
            } else {
                alert('Invalid verification code. Please try again.');
            }
        } catch (error) {
            alert('Verification failed. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submission started...");

        if (!validate()) {
            console.log("Validation failed.");
            return;
        }

        if (!emailConfirmed) {
            alert('Please verify your email before submitting.');
            console.log("Email confirmation failed.");
            return;
        }

        console.log("Validation and email confirmation passed. Preparing to submit form...");

        try {
            console.log("Form data being sent:", formData);
            const response = await axios.post('http://localhost:5000/api/v1/auth/signup', formData);

            console.log("Response received:", response);

            if (response.data && (response.data.user || response.data.success)) {
                alert('Registration successful! You can now log in.');
                console.log("Registration successful:", response.data);
            } else {
                console.log("Unexpected response structure:", response.data);
            }
        } catch (error) {
            console.error("Error during registration:", error);

            if (error.response) {
                // Server responded with a status code out of 2xx range
                console.error("Server response error:", error.response.data);
                console.error("Status code:", error.response.status);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                // Request was made but no response received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request
                console.error("Error setting up request:", error.message);
            }

            alert('Registration failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="md" className="register-container">
            <Box component="form" onSubmit={handleSubmit} className="register-form">
                <Typography variant="h5" color="primary" className="section-title">
                    Membership Information
                </Typography>

                <Typography color="error" align="right" className="required-text">
                    *=必須項目
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            label="First Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            label="Last Name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            error={!!errors.surname}
                            helperText={errors.surname}
                        />
                    </Grid>

                    <Divider className="divider"></Divider>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            label="First Name (Furigana)"
                            name="first_name_furigana"
                            value={formData.first_name_furigana}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            label="Last Name (Furigana)"
                            name="last_name_furigana"
                            value={formData.last_name_furigana}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Place of Employment"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            helperText="*Students, please enter the name of your school"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Department Name"
                            name="company_name_furigana"
                            value={formData.company_name_furigana}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Position</InputLabel>
                            <Select
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                label="Position"
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
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Postal Code"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleChange}
                            placeholder="No hyphen"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Prefecture</InputLabel>
                            <Select
                                name="prefecture"
                                value={formData.prefecture}
                                onChange={handleChange}
                                label="Prefecture"
                            >
                                <MenuItem defaultValue="Please_select">Please Select</MenuItem>
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
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="company_addr"
                            value={formData.company_addr}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Building Name"
                            name="building"
                            value={formData.building}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Telephone Number"
                            name="tel"
                            value={formData.tel}
                            onChange={handleChange}
                            placeholder="No hyphen"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Industry</InputLabel>
                            <Select
                                name="type_of_industry"
                                value={formData.type_of_industry}
                                onChange={handleChange}
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
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Job Type</InputLabel>
                            <Select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
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
                    </Grid>
                </Grid>

                <div className="section-divider"></div>

                <Typography variant="h5" color="primary" className="section-title">
                    Login Information
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box className="verification-section">
                            {verificationCodeSent ? (
                                <>
                                    <TextField
                                        fullWidth
                                        label="Verification Code"
                                        value={enteredCode}
                                        onChange={(e) => setEnteredCode(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleVerifyCode}
                                        disabled={emailConfirmed}
                                        className="verify-button"
                                    >
                                        {emailConfirmed ? 'Email Verified' : 'Verify Code'}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={handleSendVerificationCode}
                                    disabled={!formData.email || !!errors.email}
                                    className="verify-button"
                                >
                                    Send Verification Code
                                </Button>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password || 'Must contain 8+ characters, uppercase, lowercase, number, and symbol'}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box className="terms-section">
                            <Typography>
                                When registering as a new member, please check and agree to the{' '}
                                <Link href="https://billage.space/terms" target="_blank">
                                    Terms of Use
                                </Link>
                                {' '}and{' '}
                                <Link href="https://mjeinc.co.jp/privacypolicy" target="_blank">
                                    Privacy Policy
                                </Link>
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        required
                                        name="agree"
                                        checked={formData.agree}
                                        onChange={handleChange}
                                    />
                                }
                                label="Agree"
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            className="submit-button"
                        >
                            Membership Registration
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Register;