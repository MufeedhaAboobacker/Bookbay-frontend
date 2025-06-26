import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
} from '@mui/material';
import authStyles from '../styles/AuthStyles';
import api from '../api';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

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

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);
    if (formData.image) data.append('image', formData.image);

    const res = await api.post('/auth/register', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res)=> {
        const { token, data: user } = res.data;

        localStorage.setItem('bookbay_token', token);
        localStorage.setItem('bookbay_user', JSON.stringify(user));
        localStorage.setItem('role', user.role);

        alert('Registration successful!');

        // Redirect based on role
        if (user.role === 'seller') {
          navigate('/seller/home');
        } else {
          navigate('/buyer/home');
        }
      }).catch((error)=> {
        console.error('Registration failed:', error);
        const msg = error?.response?.data?.message || 'Registration failed!';
        alert(msg);
      })
  };

  return (
    <Box sx={authStyles.wrapper}>
      <Container maxWidth="sm">
        <Box sx={authStyles.formBox}>
          <Typography variant="h5" align="center" sx={authStyles.heading}>
            Register
          </Typography>

          <form onSubmit={handleRegister} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Role"
                    name="role"
                    fullWidth
                    value={formData.role}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiSelect-select': {
                        paddingRight: '144px !important'  
                      }
                    }}
                  >
                    <MenuItem value="buyer">Buyer</MenuItem>
                    <MenuItem value="seller">Seller</MenuItem>
                  </TextField>
                </Grid>

            </Grid>

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
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
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
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
