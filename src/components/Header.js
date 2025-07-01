import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar
        position="static"
        sx={{
          backgroundColor: 'transparent',
          // backgroundColor:' rgba(0, 0, 0, 0.6)',
          boxShadow: 'none',
        }}
>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
