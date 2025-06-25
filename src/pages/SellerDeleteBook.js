import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Paper,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bookbay_token');
    axios
      .get(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status) {
          setBookTitle(res.data.data.title);
        }
      })
      .catch((err) => {
        console.error('Error fetching book:', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem('bookbay_token');
    api
      .patch(`books/delete/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status) {
          alert('Book deleted successfully!');
          navigate('/seller/home');
        }
      })
      .catch((err) => {
        console.error('Error deleting book:', err.message);
        alert('Failed to delete book.');
      });
  };

  const handleCancel = () => {
    navigate(`/view/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 ,  paddingBottom:"146px" }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, color: '#d32f2f', fontFamily: 'Gilroy-Bold' }}
        >
          Confirm Delete
        </Typography>

        <Typography align="center" sx={{ mb: 3, color: '#555' }}>
          Are you sure you want to delete the book:
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 4, color: '#000', fontWeight: 500 }}
        >
          “{bookTitle}”
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ px: 4, fontWeight: 600 }}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              px: 4,
              color: '#32a89b',
              borderColor: '#32a89b',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#32a89b10',
                borderColor: '#279183',
              },
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default DeleteBook;
