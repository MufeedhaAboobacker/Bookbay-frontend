import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
    component="footer"
    sx={{
    position: 'static',
    bottom: 0,
    width: '100%',
    zIndex: 1300,
    backgroundColor:'transparent',
    // backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    color: 'white',
    py: 2,
    boxShadow: 'none', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: '37px',
  }}
>

      <Typography
        variant="body2"
        sx={{ fontFamily: 'gilroy-semi', fontWeight: 500 }}
      >
        © {new Date().getFullYear()}{' '}
        <span style={{ fontWeight: 'bold', fontFamily: 'gilroy-semi' }}>
          BookBay
        </span>. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
