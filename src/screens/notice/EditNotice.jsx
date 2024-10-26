import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    TextField,
    Typography,
    Button,
    Alert,
    CircularProgress,
} from '@mui/material';

const EditNotice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const charCount = description.length;

    useEffect(() => {
        axios.get(`http://localhost:3000/api/articles/get-by-id/${id}`)
            .then((response) => {
                const notice = response.data.data;
                setTitle(notice.title);
                setDescription(notice.description);
                setText(notice.content);
                setPublishDate(notice.published_at_date);
                setPublishTime(notice.published_at_time);
            })
            .catch((error) => {
                setError('Error fetching notice details');
                console.error(error);
            });
    }, [id]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleChange = (value) => setText(value);
    const handleDateChange = (e) => setPublishDate(e.target.value);
    const handleTimeChange = (e) => setPublishTime(e.target.value);

    const handleSubmit = async () => {
        setLoading(true);
        setMessage('');

        const updatedArticleData = {
            title,
            description,
            content: text,
            published_at_date: publishDate,
            published_at_time: publishTime,
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/articles/update/${id}`, updatedArticleData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;

            if (data.status) {
                setMessage('Article updated successfully');
                navigate('/');
            } else {
                setMessage('Failed to update article');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while updating the article');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Card variant="outlined">
                        <CardContent>
                            {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                            <Typography variant="h6" gutterBottom>
                                Title
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter article title"
                                value={title}
                                onChange={handleTitleChange}
                                required
                                sx={{ mb: 2 }}
                            />
                            <Typography variant="h6" gutterBottom>
                                Description (160 characters)
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter a brief description"
                                value={description}
                                onChange={handleDescriptionChange}
                                inputProps={{ maxLength: 160 }}
                                multiline
                                rows={2}
                                required
                                sx={{ mb: 1 }}
                            />
                            <Typography variant="body2" color="textSecondary">
                                {charCount}/160
                            </Typography>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Content
                            </Typography>
                            <ReactQuill
                                value={text}
                                onChange={handleChange}
                                className="quill-editor"
                            />
                        </CardContent>
                        <CardActions>
                            {loading ? (
                                <Button variant="contained" color="primary" disabled startIcon={<CircularProgress size={20} />}>
                                    Submitting...
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Update
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Status: Published
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Release Date"
                                type="date"
                                value={publishDate}
                                onChange={handleDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ mb: 2 }}
                                required
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Release Time"
                                type="time"
                                value={publishTime}
                                onChange={handleTimeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditNotice;
