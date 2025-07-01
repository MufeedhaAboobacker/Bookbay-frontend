import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
  Link,
} from '@mui/material';
import { useForm } from 'react-hook-form';


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authStyles from '../styles/AuthStyles';
import api from '../api';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Must include at least one lowercase letter')
  .matches(/[A-Z]/, 'Must include at least one uppercase letter')
  .matches(/\d/, 'Must include at least one number')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include at least one special character'),

  role: yup.string().oneOf(['buyer', 'seller'], 'Invalid role').required('Role is required'),
  image: yup
    .mixed()
    .test('fileType', 'Only image files allowed', (value) => {
      if (!value || value.length === 0) return true; // Optional 
      return value[0].type.startsWith('image/');
    }),
});

const Register = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);
    if (formData.image && formData.image.length > 0) {
      data.append('image', formData.image[0]);
    }

    await api.post('/auth/register', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => {
      const { token, data: user } = res.data;
      localStorage.setItem('bookbay_token', token);
      localStorage.setItem('bookbay_user', JSON.stringify(user));
      localStorage.setItem('role', user.role);
      alert('Registration successful!');
      navigate(user.role === 'seller' ? '/seller/home' : '/buyer/home');
    })
    .catch((error) => {
      console.error('Registration failed:', error);
      alert(error?.response?.data?.message || 'Registration failed!');
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('image', e.target.files);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <Box sx={authStyles.wrapper}>
      <Container maxWidth="sm">
        <Box sx={authStyles.formBox}>
          <Typography variant="h5" align="center" sx={authStyles.heading}>
            Register
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  fullWidth
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={authStyles.textFieldWhite}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Role"
                  fullWidth
                  {...register('role')}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  sx={{
                    ...authStyles.textFieldWhite,
                    '& .MuiSelect-select': {
                      paddingRight: '124px !important',
                    },
                  }}
                >
                  <MenuItem value="buyer">Buyer</MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={authStyles.textFieldWhite}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={authStyles.textFieldWhite}
            />

            {!imagePreview && (
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={authStyles.uploadButton}
              >
                Upload Profile Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  {...register('image')}
                  onChange={(e) => {
                    handleImageChange(e);
                    register('image').onChange(e);
                  }}
                />
              </Button>
            )}

            {errors.image && (
              <Typography variant="caption" color="error">
                {errors.image.message}
              </Typography>
            )}

            {imagePreview && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid #32a89b',
                  }}
                />
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={authStyles.submitButton}
            >
              Register
            </Button>

          </form>
          <Box sx={authStyles.linkText}>
            <Typography variant="body2">
              Have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={authStyles.registerLink}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
