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
        bgcolor: '#32a89b' ,
        color: 'white',
        py: 2,
        boxShadow: 3,
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
