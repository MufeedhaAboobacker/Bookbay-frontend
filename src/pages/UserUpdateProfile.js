import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Avatar,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  image: yup
    .mixed()
    .test('fileType', 'Only image files allowed', (value) => {
      if (!value || value.length === 0) return true; // Optional
      return value[0].type.startsWith('image/');
    }),
});

const EditProfile = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = localStorage.getItem('bookbay_token');

    api
      .get('/users/viewProfile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status) {
          setValue('name', res.data.data.name);
          setValue('email', res.data.data.email);
          if (res.data.data.image) {
            setPreview(`http://localhost:5000/${res.data.data.image}`);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      });
  }, [setValue]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem('bookbay_token');
    const updatedData = new FormData();
    updatedData.append('name', data.name);
    updatedData.append('email', data.email);
    if (data.image && data.image.length > 0) {
      updatedData.append('image', data.image[0]);
    }

    try {
      const res = await api.patch('/users/editProfile', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.status) {
        alert('Profile updated successfully');
        navigate('/viewProfile');
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setValue('image', e.target.files);
    }
  };

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
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
          }}
        >
          <Typography variant="h5" fontWeight={600} mb={3} align="center">
            Edit Profile
          </Typography>

          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar src={preview} alt="Profile" sx={{ width: 100, height: 100 }} />
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Name"
                    {...field}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Email"
                    type="email"
                    {...field}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                )}
              />

              <Button
                variant="outlined"
                component="label"
                sx={{
                  borderColor: '#32a89b',
                  color: '#32a89b',
                  fontWeight: 600,
                  py: 1.2,
                  '&:hover': {
                    borderColor: '#279183',
                    backgroundColor: '#32a89b10',
                  },
                }}
              >
                Upload New Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              {errors.image && (
                <Typography variant="caption" color="error">
                  {errors.image.message}
                </Typography>
              )}

              <Button
                type="submit"
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
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditProfile;
