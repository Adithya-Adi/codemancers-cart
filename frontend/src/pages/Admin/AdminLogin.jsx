import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validation';
import { AuthAPI } from '../../services/apis/authAPI';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  //states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useeffects
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInAdmin');
    const token = localStorage.getItem('admin_token');
    if (loggedInUser && token) {
      navigate('/admin/products/view');
    }
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailErrors = validateEmail(formData.email);
    const passwordErrors = validatePassword(formData.password);
    const errors = {
      ...emailErrors,
      ...passwordErrors,
    };
    setValidationErrors(errors);
    const hasErrors = Object.values(errors).some((error) => !!error);
    if (hasErrors) {
      return;
    }
    setLoading(true);
    try {
      const loginResponse = await AuthAPI.adminLogin(formData);
      localStorage.setItem('admin_token', loginResponse.token);
      localStorage.setItem('loggedInAdmin', JSON.stringify(loginResponse.data));
      toast.success('Login Successfull')
      setTimeout(() => {
        navigate('/admin/products/view');
        toast(`Hello ${loginResponse.data.email}!`, {
          icon: '👋',
        });
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
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
            name='email'
            onChange={(e) => handleInputChange(e)}
          />
          <FormHelperText sx={{ color: 'red' }}>{validationErrors?.email}</FormHelperText>
          <TextField
            fullWidth
            id='password'
            label='Password'
            variant='outlined'
            type='password'
            margin='normal'
            name='password'
            onChange={(e) => handleInputChange(e)}
          />
          <FormHelperText sx={{ color: 'red' }}>{validationErrors?.password}</FormHelperText>
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
            {loading ?
              <CircularProgress color="inherit" sx={{ color: '#fff' }} />
              :
              'Login'
            }
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
