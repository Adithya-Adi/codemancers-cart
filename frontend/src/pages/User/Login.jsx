// import { useState } from 'react';
import {
  Box,
  Link,
  IconButton,
  Divider,
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Box
        sx={{
          border: '2px solid #ccc',
          padding: '20px',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        <Typography variant='h2' align='center' gutterBottom>
          Login
        </Typography>
        <form style={{ width: '100%' }}>
          <TextField
            fullWidth
            id='email'
            label='Email'
            variant='outlined'
            margin='normal'
            required
          />
          <TextField
            fullWidth
            id='password'
            label='Password'
            variant='outlined'
            type='password'
            margin='normal'
            required
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            style={{ marginTop: '20px' }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant='body2' align='center' mt={2} mb={3}>
            Don&apos;t have an account? <Link component={RouterLink} to='/register'>Register</Link>
          </Typography>
          <Divider />
          {/* Social login */}
          <Typography variant='body2' align='center' mt={2}>
            Or sign in with
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <IconButton>
              <GoogleIcon />
            </IconButton>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
