import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
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

const Announcements = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const charCount = description.length;

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleChange = (value) => setText(value);
    const handleDateChange = (e) => setPublishDate(e.target.value);
    const handleTimeChange = (e) => setPublishTime(e.target.value);

    const handleSubmit = async () => {
        setLoading(true);
        setMessage('');

        const articleData = {
            title,
            description,
            content: text,
            published_at_date: publishDate,
            published_at_time: publishTime,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/articles/save', articleData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;

            if (data.status) {
                setMessage(data.message);
                // Reset form fields
                setTitle('');
                setDescription('');
                setText('');
                setPublishDate('');
                setPublishTime('');
            } else {
                setMessage('Failed to save article');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while saving the article');
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
                                    Submit
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

export default Announcements;
