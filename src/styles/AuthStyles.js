const authStyles = {
  wrapper: {
    minHeight: 'calc(100vh - 128px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 50%, #f0f4f8 100%)',
    px: 2,
  },
  formBox: {
    bgcolor: '#ffffff',
    p: { xs: 3, sm: 4 },
    borderRadius: 3,
    width: '100%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  heading: {
    fontFamily: 'gilroy-bold',
    color: '#32a89b',
    mb: 1,
  },
  uploadButton: {
    mt: 2,
    borderColor: '#32a89b',
    color: '#32a89b',
    fontFamily: 'gilroy-semi',
    '&:hover': {
      bgcolor: '#32a89b14',
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
