import React, { useEffect, useState } from 'react';
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
  CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import api from '../api';

const categories = [
  'fiction', 'non-fiction', 'educational', 'biography', 'fantasy', 'science-fiction',
  'romance', 'mystery', 'thriller', 'self-help', 'history', 'philosophy', 'children',
  'young-adult', 'comics', 'graphic-novels', 'religion', 'health', 'business', 'technology',
  'travel', 'poetry', 'cookbooks', 'art', 'sports', 'language', 'other'
];

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  price: yup.number().typeError('Price must be a number').positive('Price must be positive').required('Price is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  rating: yup.number().typeError('Rating must be a number').min(0, 'Minimum rating is 0').max(5, 'Maximum rating is 5').required('Rating is required'),
  stock: yup.number().typeError('Stock must be a number').integer('Stock must be an integer').min(1, 'Stock must be at least 1').required('Stock is required'),
});

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    stock: '',
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bookbay_user'));
    if (!user || user.role !== 'seller') {
      alert('Access denied. Only sellers can update books.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem('bookbay_token');
        const res = await api.get(`/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status) {
          setFormData(res.data.data);
          if (res.data.data.image) {
            setImagePreview(`${process.env.REACT_APP_BACKEND_URL}/${res.data.data.image}`);
          }
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

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setImagePreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors);
      return;
    }

    const token = localStorage.getItem('bookbay_token');
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (file) {
      data.append('image', file);
    }

    try {
      const res = await api.patch(`/books/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        alert('Book updated successfully!');
        navigate('/seller/home');
      } else {
        alert('Failed to update book');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  const handleCancel = () => {
    navigate('/seller/home');
  };

  if (loading) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="success" />
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
        <Card sx={{ borderRadius: 3, backgroundColor: 'transparent' }}>
          <CardHeader
            title="Update Book"
            sx={{
              textAlign: 'center',
              color: '#fff',
              py: 2,
              '& .MuiCardHeader-title': {
                fontSize: '1.6rem',
                fontWeight: 'bold',
              },
            }}
          />
          <Divider />
          <CardContent sx={{ py: 4, px: 3 }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Grid container spacing={3} direction="column">
                {["title", "author", "price", "rating", "stock", "description"].map((field) => (
                  <Grid item key={field}>
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      type={field === 'price' || field === 'rating' || field === 'stock' ? 'number' : 'text'}
                      multiline={field === 'description'}
                      rows={field === 'description' ? 3 : undefined}
                      value={formData[field]}
                      onChange={handleChange}
                      fullWidth
                     
                      error={Boolean(errors[field])}
                      helperText={errors[field] || ''}
                      InputLabelProps={{ style: { color: '#ccc' } }}
                      InputProps={{ style: { color: '#fff' } }}
                    />
                  </Grid>
                ))}

                <Grid item>
                  <FormControl fullWidth required error={Boolean(errors.category)}>
                    <InputLabel id="category-label" sx={{ color: '#ccc' }}>
                      Category
                    </InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      label="Category"
                      sx={{ color: '#fff' }}
                    >
                      <MenuItem value="" disabled>Select Category</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                    {errors.category && (
                      <Typography variant="caption" color="error" sx={{ ml: 2 }}>{errors.category}</Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item>
                  {imagePreview && (
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle2" mb={1} sx={{ color: '#fff' }}>
                        {file ? 'New Image Preview' : 'Current Book Image'}
                      </Typography>
                      <img
                        src={imagePreview}
                        alt="Book"
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
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{
                      mt: 2,
                      borderColor: '#32a89b',
                      color: '#32a89b',
                      fontWeight: 600,
                      py: 1.3,
                    }}
                  >
                    Upload {imagePreview ? 'New ' : ''}Image
                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                  </Button>
                </Grid>

                <Grid item>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6}>
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
                        Save Changes
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        onClick={handleCancel}
                        sx={{
                          fontWeight: 600,
                          py: 1.2,
                          color: '#ddd',
                          borderColor: '#aaa',
                          '&:hover': { bgcolor: '#444' },
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
    </Box>
  );
};

export default UpdateBook;
