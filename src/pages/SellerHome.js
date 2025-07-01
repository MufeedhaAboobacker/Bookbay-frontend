import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListBook from '../pages/ListBook.js';
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Tooltip,
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SellerHome = () => {
  const navigate = useNavigate();
  const [sellerName, setSellerName] = useState('');
  const [sellerImage, setSellerImage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bookbay_user'));
    if (user && user.name) {
      setSellerName(user.name);
      setSellerImage(user.image);
    }
  }, []);

  return (
    <Box
        sx={{
          paddingTop:'10px',
          paddingBottom:'102px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        }}
      >
        <Container sx={{ mt: 4
          
         }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              mb: 1,
              gap: 1,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight={600} sx={{ color: '#fff' }}>
                Welcome {sellerName}
              </Typography>
            </Box>

            <Tooltip title="View Profile">
              <IconButton
                onClick={() => navigate('/viewProfile')}
                sx={{
                  backgroundColor: '#32a89b',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#279183',
                  },
                  width: 44,
                  height: 44,
                  p: 0,
                }}
              >
                {sellerImage ? (
                  <Avatar
                    src={`${process.env.REACT_APP_BACKEND_URL}/${sellerImage}`}
                    alt={sellerName}
                    sx={{ width: 56, height: 56 }}
                  />
                ) : (
                  <AccountCircleIcon sx={{ fontSize: 32 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 5 }}>
            <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/add')}
              >
                Add Book
              </Button>
            </Stack>
          </Box>

          <ListBook />
        </Container>
      </Box>

  );
};

export default SellerHome;
