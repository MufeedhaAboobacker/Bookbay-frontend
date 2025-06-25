// EditProfile.js

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
import api from '../api';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('bookbay_token');

    api
      .get('/users/viewProfile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status) {
          setFormData({
            name: res.data.data.name,
            email: res.data.data.email,
            image: null,
          });
          if (res.data.data.image) {
            setPreview(`http://localhost:5000/${res.data.data.image}`);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('bookbay_token');

    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('email', formData.email);
    if (formData.image) {
      updatedData.append('image', formData.image);
    }

    api
      .patch('/users/editProfile', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.status) {
          alert('Profile updated successfully');
          navigate('/viewProfile');
        }
      })
      .catch((err) => {
        console.error('Failed to update profile:', err);
        alert('Update failed');
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Edit Profile
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            src={preview}
            alt="Profile"
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />

            <Button variant="outlined" component="label">
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            <Button type="submit" variant="contained" size="large">
              Save Changes
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProfile;
