const authStyles = {
  wrapper: {
    minHeight: 'calc(100vh - 128px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    py: 1,
    position: 'relative',


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

  formBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.)',
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        width: '100%',
        maxWidth: 420, 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative',
        zIndex: 2, 
        mx: 2, 
      },


        textFieldWhite: {
          // backgroundColor: 'transparent',
        '& label': {
          color: '#fff',
        },
        '& label.Mui-focused': {
          color: '#fff',
        },
        '& .MuiOutlinedInput-root': {
          color: '#fff',
          backgroundColor: 'transparent', 
          '& input': {
            backgroundColor: 'transparent',
          },
          '& fieldset': {
            borderColor: '#fff',

          },
          '&:hover fieldset': {
            borderColor: '#fff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#fff',
          },
        },
      },



  heading: {
    fontFamily: 'gilroy-bold',
    color: '#ffffff',
    mb: 1,
    textAlign: 'center',
  },

  uploadButton: {
    mt: 2,
    borderColor: '#ffffff',
    color: '#ffffff',
    fontFamily: 'gilroy-semi',
    '&:hover': {
      bgcolor: '#ffffff',
      borderColor: '#279183',
    },
  },

  submitButton: {
    mt: 3,
    bgcolor: '#32a89b',
    color: 'white',
    fontFamily: 'gilroy-semi',
    '&:hover': {
      bgcolor: '#279183',
    },
  },

  linkText: {
    mt: 2,
    textAlign: 'center',
    fontFamily: 'gilroy-regular',
    color: '#ffffff'
  },

  registerLink: {
    color: '#32a89b',
    fontWeight: 600,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default authStyles;
