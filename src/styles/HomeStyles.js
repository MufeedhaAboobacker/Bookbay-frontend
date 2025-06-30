const homeStyles = {
  mainBox: {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  px: 2,
  position: 'relative',
  backgroundImage: 'url("/image/background.jpeg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  },
  zIndex: 2,
},


  container: {
    textAlign: 'center',
    position: 'relative', 
    zIndex: 2,
    
  },

  titleText: {
    fontFamily: 'gilroy-bold, sans-serif',
    fontSize: '2.8rem',
    fontWeight: 700,
    color: '#fff', 
  },

  subtitleText: {
    fontFamily: 'gilroy-r, sans-serif',
    fontSize: '1.25rem',
    color: '#e0e0e0', 
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
    color: '#fff',
  },
};

export default homeStyles;
