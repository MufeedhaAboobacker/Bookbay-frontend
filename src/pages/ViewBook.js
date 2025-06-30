import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  Button,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('bookbay_user'));
  const isSeller = user?.role === 'seller';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('bookbay_token');
        const res = await api.get(`/books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status) {
          setBookList(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching all books:', err);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('bookbay_token');
        const res = await api.get(`/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(res.data.data);
      } catch (err) {
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const getCurrentIndex = () => bookList.findIndex((b) => b._id === id);

  const handlePrev = () => {
    const index = getCurrentIndex();
    if (index > 0) navigate(`/view/${bookList[index - 1]._id}`);
  };

  const handleNext = () => {
    const index = getCurrentIndex();
    if (index < bookList.length - 1) navigate(`/view/${bookList[index + 1]._id}`);
  };

  if (loading) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!book) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h5" color="error" align="center">
          Book not found.
        </Typography>
      </Container>
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
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Card sx={{ borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 4 }}>
            <Box sx={{ width: { xs: '100%', md: '40%' }, mb: { xs: 3, md: 0 }, mr: { md: 4 } }}>
              <CardMedia
                component="img"
                image={book.image ? `http://localhost:5000/${book.image}` : '/images/default-book.jpeg'}
                alt={book.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
              />
            </Box>

            <Box sx={{ flex: 1, color: '#fff' }}>
              {isSeller && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Tooltip title="Edit Book">
                    <IconButton color="warning" onClick={() => navigate(`/update/${book._id}`)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Book">
                    <IconButton color="error" onClick={() => navigate(`/delete/${book._id}`)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}

              <Typography variant="h4" fontWeight={700} gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ fontStyle: 'italic', opacity: 0.8 }}>
                by {book.author}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                <Chip label={`₹${book.price}`} color="success" />
                <Chip label={`Category: ${book.category}`} />
                <Chip label={`Rating: ${book.rating || 'N/A'}`} />
                <Chip label={`Stock: ${book.stock}`} />
              </Stack>

              <Typography variant="h6" fontWeight={600} gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
                {book.description}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          spacing={2}
          sx={{ mt: 5 }}
        >
          <Button variant="outlined" onClick={handlePrev} disabled={getCurrentIndex() <= 0} sx={{ px: 4 }}>
            Previous
          </Button>
          <Button
            variant="contained"
            color='#32a89b'
            onClick={() => navigate(user?.role === 'seller' ? '/seller/home' : '/buyer/home')}
            sx={{ px: 4 }}
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={getCurrentIndex() >= bookList.length - 1}
            sx={{ px: 4 }}
          >
            Next
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default ViewBook;
