import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import authStyles from '../styles/AuthStyles';
import api from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleLogin = (e) => {
  e.preventDefault();

  api.post('/auth/login', formData)
    .then((res) => {
      const { token, data } = res.data;

      localStorage.setItem('bookbay_token', token);
      localStorage.setItem('bookbay_user', JSON.stringify(data));

      alert('Woww you Logged In!');

      const user = JSON.parse(localStorage.getItem('bookbay_user'));

      if (user.role === 'seller') {
        navigate('/seller/home');
      } else {
        navigate('/buyer/home');
      }
    })
    .catch((err) => {
      const msg = err?.response?.data?.message || 'Login failed!';
      alert(msg);
    });
  };

  return (
    <Box sx={authStyles.wrapper}>
      <Container maxWidth="sm">
        <Box sx={authStyles.formBox}>
          <Typography variant="h5" align="center" sx={authStyles.heading}>
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={authStyles.submitButton}
            >
              Login
            </Button>
          </form>

          <Box sx={authStyles.linkText}>
            <Typography variant="body2">
              Don&apos;t have an account?{' '}
              <Link
                component={RouterLink}
                to="/register"
                sx={authStyles.registerLink}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
