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
    <Container sx={{ mt: 4 }}>
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          mb: 1,
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Welcome {sellerName}
          </Typography>
          {/* <Typography variant="subtitle1" color="text.secondary">
            Manage your books and listings here.
          </Typography> */}
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
              p:0,
            }}
          >
            {sellerImage ? (
              <Avatar
                src={`http://localhost:5000/${sellerImage}`}
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
  );
};

export default SellerHome;
