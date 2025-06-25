import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import homeStyles from '../styles/HomeStyles';

const Home = () => {
  return (
    <Box sx={homeStyles.mainBox}>
      <Container maxWidth="sm" sx={homeStyles.container}>
        <Typography variant="h3" gutterBottom sx={homeStyles.titleText}>
          Welcome to <span style={{ color: '#32a89b' }}>BookBay</span> 📚
        </Typography>

        <Typography variant="h6" paragraph sx={homeStyles.subtitleText}>
          Discover, buy, and manage your books with ease.
        </Typography>

        <Button
          component={Link}
          to="/login"
          variant="contained"
          size="large"
          sx={homeStyles.button}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
