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
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('bookbay_token');
    localStorage.removeItem('bookbay_user');
    localStorage.removeItem('role');
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
    ? `${process.env.REACT_APP_BACKEND_URL}/${profile.image}`
    : null;

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
      }}>
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 4,
            position: 'relative',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
          }}>
          <Tooltip title="Edit Profile">
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 16, right: 50, color: '#fff' }}
              onClick={() => navigate('/EditProfile')}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 16, right: 10, color: '#fff' }}
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

            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              {profile.email}
            </Typography>

            <Typography variant="body2" sx={{ color: '#aaa' }}>
              Role: {profile.role?.toUpperCase()}
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserProfile;
