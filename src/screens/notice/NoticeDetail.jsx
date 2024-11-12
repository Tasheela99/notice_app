import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosInstance from "../../config/axiosInstance.js";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    CircularProgress,
    Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './NoticeDetail.css'; // Import the external CSS

const NoticeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AxiosInstance.get(`/articles/get-by-id/${id}`)
            .then((response) => {
                const responseData = response.data;
                if (responseData.status) {
                    setNotice(responseData.data);
                } else {
                    setError('Notice not found');
                }
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching notice details');
                setLoading(false);
            });
    }, [id]);

    const handleDelete = (noticeId) => {
        if (window.confirm('Are you sure you want to delete this notice?')) {
            AxiosInstance.delete(`/articles/delete/${noticeId}`)
                .then((response) => {
                    if (response.data.status) {
                        alert('Notice deleted successfully!');
                        navigate('/');
                    } else {
                        throw new Error('Delete operation did not return success status');
                    }
                })
                .catch((error) => {
                    setError('Error deleting notice: ' + error.message);
                });
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <div className="notice-image-container">
                        <CardMedia
                            component="img"
                            height="400"
                            image={notice?.imgUrl || "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg"}
                            alt="Notice"
                        />
                        <div className="notice-card-overlay">
                            <div className="notice-buttons">
                                <IconButton
                                    className="notice-manage-buttons"
                                    color="primary"
                                    onClick={() => navigate(`/dashboard/notices/notice/edit/${notice._id}`)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className="notice-manage-buttons"
                                    color="error"
                                    onClick={() => handleDelete(notice._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            <Typography variant="h4" className="notice-title">
                                {notice.title}
                            </Typography>
                        </div>
                    </div>
                    <CardContent>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            {notice.content}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                            Published on: {notice.published_at_date}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NoticeDetail;
