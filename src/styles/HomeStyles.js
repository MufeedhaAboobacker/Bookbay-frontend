// src/styles/HomeStyles.js
const homeStyles = {
  mainBox: {
    minHeight: '100vh', // use full height, since no header/footer here
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // soft background
    px: 2,
  },
  container: {
    textAlign: 'center',
  },
  titleText: {
    fontFamily: 'gilroy-bold, sans-serif',
    fontSize: '2.8rem',
    fontWeight: 700,
    color: '#333',
  },
  subtitleText: {
    fontFamily: 'gilroy-r, sans-serif',
    fontSize: '1.25rem',
    color: '#555',
    marginBottom: '2rem',
  },
  button: {
    fontFamily: 'gilroy-bold, sans-serif',
    backgroundColor: '#32a89b',
    '&:hover': {
      backgroundColor: '#2d998d',
    },
    px: 4,
    py: 1.5,
    fontSize: '1rem',
  },
};

export default homeStyles;
