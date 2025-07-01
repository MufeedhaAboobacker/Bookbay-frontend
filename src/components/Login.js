import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import authStyles from '../styles/AuthStyles';
import api from '../api';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    api
      .post('/auth/login', formData)
      .then((res) => {
        const { token, data } = res.data;
        localStorage.setItem('bookbay_token', token);
        localStorage.setItem('bookbay_user', JSON.stringify(data));

        alert('Login successful!!!');

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
