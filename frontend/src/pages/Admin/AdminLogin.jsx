import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
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
          Admin Login
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
            style={{
              marginTop: '20px',
              marginBottom: '40px'
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
