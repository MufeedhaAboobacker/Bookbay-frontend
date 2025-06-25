import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#32a89b' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontFamily: 'gilroy-bold',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
         <i className="fa-sharp fa-solid fa-book-open-reader"></i> 
          BookBay
        </Typography>

        <Box sx={{ marginLeft: 'auto' }}>
          {/* <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="inherit"
            sx={{
              mr: 1,
              fontFamily: 'gilroy-semi',
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: '#ccc',
                backgroundColor: '#ffffff22',
              },
            }}
          >
            Get Started
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
