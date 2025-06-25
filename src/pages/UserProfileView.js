import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// Font Awesome (assumes you added CDN in index.html)
const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('bookbay_token');

    api
      .get('/users/viewProfile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
        setLoading(false);
      });
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('bookbay_token');
    navigate('/login');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h5" color="error" align="center">
          Unable to load profile.
        </Typography>
      </Container>
    );
  }

  const imageUrl = profile.image
    ? `http://localhost:5000/${profile.image}`
    : null;

  return (
    <Container maxWidth="sm" sx={{ mt: 8, pb: 8 }}>
      <Paper elevation={2} sx={{ p: 5, borderRadius: 4, position: 'relative' }}>
        {/* Edit Button */}
        <Tooltip title="Edit Profile">
          <IconButton
            size="small"
            sx={{ position: 'absolute', top: 16, right: 50 }}
            onClick={() => navigate('/EditProfile')}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        {/* Logout Button */}
        <Tooltip title="Logout">
          <IconButton
            size="small"
            sx={{ position: 'absolute', top: 16, right: 10 }}
            onClick={logoutHandler}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </IconButton>
        </Tooltip>

        <Stack alignItems="center" spacing={2}>
          {imageUrl ? (
            <Avatar
              src={imageUrl}
              alt={profile.name}
              sx={{ width: 100, height: 100 }}
            />
          ) : (
            <Avatar sx={{ bgcolor: '#1976d2', width: 100, height: 100 }}>
              {profile.name?.charAt(0).toUpperCase()}
            </Avatar>
          )}

          <Typography variant="h5" fontWeight={600}>
            {profile.name}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {profile.email}
          </Typography>

          <Typography variant="body2" sx={{ color: '#666' }}>
            Role: {profile.role?.toUpperCase()}
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default UserProfile;
