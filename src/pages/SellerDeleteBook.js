import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Paper,
  Stack,
} from '@mui/material';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bookbay_token');
    api
      .get(`/books/${id}`, {
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
    <Box
      sx={{
        minHeight: 'calc(100vh - 128px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        px: 2,
        py: 6,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 0,
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper elevation={4} sx={{ p: 5, borderRadius: 3, backgroundColor: 'transparent' }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: '' }}
          >
            Confirm Delete
          </Typography>

          <Typography align="center" sx={{ mb: 3, color: '#ccc' }}>
            Are you sure you want to delete the book:
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 4, color: '#fff', fontWeight: 500 }}
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
    </Box>
  );
};

export default DeleteBook;