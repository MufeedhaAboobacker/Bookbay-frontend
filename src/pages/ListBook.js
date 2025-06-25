import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ListBook = ({ searchTerm }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = () => {
    const token = localStorage.getItem('bookbay_token');
    api
      .get('/books/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status) {
          setBooks(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching books:', err.message);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes((searchTerm || '').trim().toLowerCase())
  );

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Grid container spacing={4} justifyContent="center">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Grid item xs={12} md={6} key={book._id}>
              <Card
                sx={{
                  display: 'flex',
                  height: 280,
                  borderRadius: 3,
                  boxShadow: 6,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 10,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:5000/${book.image}`}
                  alt={book.title}
                  sx={{
                    width: 200,
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      px: 3,
                      py: 2.5,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {book.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        by {book.author}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: '#32a89b',
                          paddingRight: '100px',
                        }}
                      >
                        ₹{book.price}
                      </Typography>
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={() => handleView(book._id)}
                        sx={{
                          backgroundColor: '#32a89b',
                          color: '#fff',
                          fontWeight: 600,
                          textTransform: 'none',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: '#279183',
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="text.secondary">
              No matching book found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ListBook;
