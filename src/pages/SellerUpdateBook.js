import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const categories = ['fiction','non-fiction','educational','biography','fantasy','science-fiction',
  'romance','mystery','thriller','self-help','history','philosophy','children','young-adult','comics',
  'graphic-novels','religion','health','business','technology','travel','poetry','cookbooks','art','sports',
  'language','other'];

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    stock: '',
    rating: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);

  // Check if user is a seller
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bookbay_user'));
    if (!user || user.role !== 'seller') {
      alert('Access denied. Only sellers can update books.');
      navigate('/login'); 
    }
  }, [navigate]);

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem('bookbay_token');
        const res = await axios.get(`http://localhost:5000/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status) {
          setFormData(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('bookbay_token');
      const res = await axios.patch(`http://localhost:5000/api/books/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status) {
        alert('Book updated successfully!');
        navigate('/seller/home');
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert('You are not authorized to update this book.');
      } else {
        alert('Failed to update book. Please try again.');
      }
      console.error('Update failed:', error.response?.data || error.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: '#32a89b', fontFamily: 'Gilroy-Bold' }}
        >
          Update Book
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Book Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Price (₹)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                inputProps={{ step: 0.1, min: 0, max: 5 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 4,
              bgcolor: '#32a89b',
              color: 'white',
              fontWeight: 600,
              fontFamily: 'Gilroy-Semi',
              '&:hover': {
                bgcolor: '#279183',
              },
            }}
          >
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateBook;
