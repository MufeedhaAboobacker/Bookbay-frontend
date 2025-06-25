import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const categories = ['fiction','non-fiction','educational','biography','fantasy','science-fiction',
  'romance','mystery','thriller','self-help','history','philosophy','children','young-adult','comics',
  'graphic-novels','religion','health','business','technology','travel','poetry','cookbooks','art','sports',
  'language','other'];

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    stock: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bookbay_user'));
    if (user?.role !== 'seller') {
      alert('Only sellers can add books');
      navigate('/seller/home');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    navigate('/seller/home');
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('bookbay_token');
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => data.append(key, value));

  api
    .post('books/add', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data.status) {
        alert('Book added successfully!');
        navigate('/seller/home');
      } else {
        alert('Failed to add book');
      }
    })
    .catch((err) => {
      console.error(err);
      alert('Something went wrong');
    });
    };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Card sx={{ boxShadow: 5, borderRadius: 4 }}>
        <CardHeader
          title="Add New Book"
          sx={{
            textAlign: 'center',
            backgroundColor: '#32a89b',
            color: '#fff',
            py: 2,
            fontSize: '1.6rem',
            fontWeight: 'bold',
          }}
        />
        <Divider />
        <CardContent sx={{ py: 4, px: 3 }}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3} direction="column">
              <Grid item>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Price (₹)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item>
                <FormControl fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    <MenuItem value="" disabled>Select Category</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <TextField
                  label="Rating (0–5)"
                  name="rating"
                  type="number"
                  inputProps={{ min: 0, max: 5, step: 0.1 }}
                  value={formData.rating}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item>
                {!imagePreview ? (
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{
                      borderColor: '#32a89b',
                      color: '#32a89b',
                      fontWeight: 600,
                      py: 1.3,
                    }}
                  >
                    Upload Book Image
                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                  </Button>
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle2" mb={1}>Image Preview</Typography>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: 160,
                        height: 160,
                        objectFit: 'cover',
                        borderRadius: 10,
                        border: '2px solid #32a89b',
                      }}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item>
            <Grid container spacing={2} justifyContent="center" maxWidth="sm" margin="0 auto">
              <Grid item xs={12} sm={6} md={5}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#32a89b',
                    color: '#fff',
                    fontWeight: 600,
                    py: 1.2,
                    '&:hover': { bgcolor: '#279183' },
                  }}
                >
                  Add Book
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    fontWeight: 600,
                    py: 1.2,
                    color: '#555',
                    borderColor: '#aaa',
                    '&:hover': { bgcolor: '#f5f5f5' },
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>

            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddBook;
