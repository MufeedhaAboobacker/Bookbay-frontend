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
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api';

const categories = ['fiction','non-fiction','educational','biography','fantasy','science-fiction',
  'romance','mystery','thriller','self-help','history','philosophy','children','young-adult','comics',
  'graphic-novels','religion','health','business','technology','travel','poetry','cookbooks','art','sports',
  'language','other'];

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  price: yup.number().typeError('Must be a number').positive().required(),
  description: yup.string().required(),
  category: yup.string().required('Category is required'),
  rating: yup.number().typeError('Must be a number').min(0).max(5).required(),
  stock: yup.number().typeError('Must be a number').integer().min(1).required(),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files allowed', (value) => {
      if (!value || value.length === 0) return true; // Optional 
      return value[0].type.startsWith('image/');
    })
});

const AddBook = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bookbay_user'));
    if (user?.role !== 'seller') {
      alert('Only sellers can add books');
      navigate('/seller/home');
    }
  }, [navigate]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const token = localStorage.getItem('bookbay_token');
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image') {
        formData.append('image', value[0]); 
        formData.append(key, value);
      }
    });

    api.post('books/add', formData, {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('image', e.target.files);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 3, color: '#fff', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <CardHeader title="Add New Book" sx={{ textAlign: 'center', color: '#fff' }} />
          <Divider />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    label="Title"
                    fullWidth
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Author"
                    fullWidth
                    {...register('author')}
                    error={!!errors.author}
                    helperText={errors.author?.message}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Price"
                    type="number"
                    fullWidth
                    {...register('price')}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>

                <Grid item>
                  <FormControl fullWidth error={!!errors.category}>
                    <InputLabel sx={{ color: '#ccc' }}>Category</InputLabel>
                    <Controller
                      name="category"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select {...field} sx={{ color: '#fff' }}>
                          <MenuItem value="" disabled>Select Category</MenuItem>
                          {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <Typography variant="caption" color="error">{errors.category?.message}</Typography>
                  </FormControl>
                </Grid>

                <Grid item>
                  <TextField
                    label="Rating"
                    type="number"
                    fullWidth
                    {...register('rating')}
                    error={!!errors.rating}
                    helperText={errors.rating?.message}
                    inputProps={{ min: 0, max: 5, step: 0.1 }}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Stock"
                    type="number"
                    fullWidth
                    {...register('stock')}
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                    {...register('description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>

                <Grid item>
                  <Button variant="contained" component="label" fullWidth color='#fff'>
                    Upload Book Image
                    <input type="file" hidden accept="image/*" {...register('image')} onChange={handleImageChange} />
                  </Button>
                  {errors.image && (
                    <Typography variant="caption" color="error">
                      {errors.image.message}
                    </Typography>
                  )}
                  {imagePreview && (
                    <Box mt={2} textAlign="center">
                      <img src={imagePreview} alt="Preview" style={{ width: 160, height: 160, objectFit: 'cover' }} />
                    </Box>
                  )}
                </Grid>

                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#32a89b' }}>
                        Add Book
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button type="button" fullWidth variant="contained"  sx={{ bgcolor: '#fff', color:'#000' }} onClick={() => navigate('/seller/home')}>
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

export default AddBook;