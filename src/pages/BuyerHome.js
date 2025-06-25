import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListBook from '../pages/ListBook.js';
import {
  Container,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Box,
  TextField,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BuyerHome = () => {
  const [search, setSearch] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerImage, setBuyerImage] = useState(null);
  const navigate = useNavigate();

  // Load buyer info from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bookbay_user'));
    if (user) {
      setBuyerName(user.name || '');
      setBuyerImage(user.image || null);
    }
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Welcome {buyerName}
          </Typography>
          {/* <Typography variant="subtitle1" color="text.secondary">
            Explore available books and make purchases.
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
              width: 56,
              height: 56,
              p: 0,
            }}
          >
            {buyerImage ? (
              <Avatar
                src={`http://localhost:5000/${buyerImage}`}
                alt={buyerName}
                sx={{ width: 56, height: 56 }}
              />
            ) : (
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search Books by Title (Exact Match)"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <ListBook searchTerm={search} />
    </Container>
  );
};

export default BuyerHome;
