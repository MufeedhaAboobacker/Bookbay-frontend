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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const token = localStorage.getItem('bookbay_token');
        await api.delete(`/books/${book._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Book deleted successfully');
        navigate('/seller/home');
      } catch (err) {
        console.error('Delete failed', err);
        alert('Failed to delete the book');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress size={60} />
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
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Card
        sx={{
          boxShadow: 6,
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          backgroundColor: '#fafafa',
          position: 'relative',
        }}
      >

        <Box
          sx={{
            width: { xs: '100%', md: '40%' },
            height: { xs: 300, md: '100%' },
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={`http://localhost:5000/${book.image}`}
            alt={book.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>


        <CardContent sx={{ flex: 1, p: 4, position: 'relative' }}>
         
          {isSeller && (
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 1,
              }}
            >
              <Tooltip title="Edit Book">
                <IconButton
                  size="small"
                  color="warning"
                  onClick={() => navigate(`/update/${book._id}`)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Book">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => navigate(`/delete/${book._id}`)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}

        
          {book?.seller?.name && (
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                backgroundColor: '#e0f7fa',
                color: '#00796b',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                display: 'inline-block',
                fontWeight: 600,
              }}
            >
              Seller: {book.seller.name}
            </Typography>
          )}

      
          <Typography variant="h4" fontWeight={700} sx={{ color: '#2e7d32' }}>
            {book.title}
          </Typography>

          <Typography
            variant="subtitle1"
            fontStyle="italic"
            sx={{ mb: 2 }}
            color="text.secondary"
          >
            by {book.author}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
            <Chip label={`₹${book.price}`} color="success" />
            <Chip label={`Category: ${book.category}`} />
            <Chip label={`Rating: ${book.rating || 'N/A'}`} />
            <Chip label={`Stock: ${book.stock}`} />
          </Stack>

         
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1, color: '#444' }}>
            Description
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: 'justify',
              lineHeight: 1.7,
            }}
          >
            {book.description}
          </Typography>
        </CardContent>
      </Card>

      
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        spacing={2}
        sx={{ mt: 5 }}
      >
        <Button
          variant="outlined"
          onClick={handlePrev}
          disabled={getCurrentIndex() <= 0}
          sx={{ px: 4 }}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (user?.role === 'seller') {
              navigate('/seller/home');
            } else {
              navigate('/buyer/home');
            }
          }}
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
  );
};

export default ViewBook;
