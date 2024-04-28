import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2">
        &copy; 2024 Codemancers-Cart. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
