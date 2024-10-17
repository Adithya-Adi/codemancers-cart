import { Box, Typography, Divider, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <>
      <Divider sx={{ marginTop: 4 }} />
      <Box
        component='footer'
        sx={{
          color: '#fff',
          padding: '20px',
          textAlign: 'center',
          marginTop: 'auto',
        }}
      >
        <Typography variant='body2'>
          &copy; 2024 Codemancers-Cart. All rights reserved.
        </Typography>
        <Link href="/" color="inherit" sx={{ marginTop: 1, display: 'inline-block' }}>
          Home
        </Link>
      </Box>
    </>
  );
};

export default Footer;