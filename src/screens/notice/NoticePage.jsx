import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from "../../config/axiosInstance.js";
import {
    Box,
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress
} from '@mui/material';
import './NoticePage.css';

const NoticePage = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AxiosInstance.get('/articles/get-all')
            .then((response) => {
                const responseData = response.data;
                if (responseData.status && Array.isArray(responseData.data)) {
                    setNotices(responseData.data);
                } else {
                    setNotices([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Box className="loading-container"><CircularProgress /></Box>;
    }

    if (error) {
        return <Box className="loading-container"><Typography>{error}</Typography></Box>;
    }

    return (
        <Container>
            <Box className="header-container">
                <h2>Notice</h2>
                <p>Notice</p>
            </Box>

            <Box className="notices-grid">
                {notices.length > 0 ? (
                    notices.map((notice, index) => (
                        <Link to={`/dashboard/notices/notice/${notice._id}`} key={index} className="notice-card">
                            <Card sx={{ display: 'flex', width: '100%' }}>
                                {notice.imgUrl ? (
                                    <CardMedia
                                        component="img"
                                        className="notice-image"
                                        image={notice.imgUrl}
                                        alt="Notice"
                                    />
                                ) : (
                                    <Box className="notice-image">
                                        <p>Image not available</p>
                                    </Box>
                                )}
                                <CardContent className="notice-card-content">
                                    <p>{notice.published_at_date}</p>
                                    <h3>{notice.title}</h3>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <p>No notices available.</p>
                )}
            </Box>
        </Container>
    );
};

export default NoticePage;
