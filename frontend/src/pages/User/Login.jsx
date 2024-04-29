import { useState, useEffect } from 'react';
import {
  Box,
  Link,
  IconButton,
  Divider,
  Container,
  Typography,
  TextField,
  Button,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validation';
import { AuthAPI } from '../../services/apis/authAPI';
import toast from 'react-hot-toast';

const Login = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // useeffects
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = localStorage.getItem('token');
    if (loggedInUser && token) {
      navigate('/home');
    }
  }, [navigate])

  useEffect(() => {
    if (window.google && window.google.accounts) {
      const googleAccounts = window.google.accounts;
      googleAccounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_OAUTH_ID,
        callback: googleUserVerifyHandler,
      });

      googleAccounts.id.renderButton(document.getElementById("googlesignin"), {
        ux_mode: "popup",
        size: "large",
      });
    } else {
      console.error("Google Accounts API is not available.");
    }
  }, []);

  // Google sign in
  const googleUserVerifyHandler = async ({ credential }) => {
    try {
      const loginResponse = await AuthAPI.googleLogin(credential);
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('loggedInUser', JSON.stringify(loginResponse.data));
      toast.success(loginResponse.message)
      setTimeout(() => {
        navigate('/home');
        toast(`Hello ${loginResponse.data.email}!`, {
          icon: '👋',
        });
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
      const loginResponse = await AuthAPI.userLogin(formData);
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('loggedInUser', JSON.stringify(loginResponse.data));
      toast.success(loginResponse.message)
      setTimeout(() => {
        navigate('/home');
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
          Login
        </Typography>
        <form style={{ width: '100%' }}>
          <TextField
            fullWidth
            id='email'
            label='Email *'
            variant='outlined'
            margin='normal'
            name='email'
            onChange={(e) => handleInputChange(e)}
          />
          <FormHelperText sx={{ color: 'red' }}>{validationErrors?.email}</FormHelperText>
          <TextField
            fullWidth
            id='password'
            label='Password *'
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
            style={{ marginTop: '20px' }}
            onClick={handleLogin}
          >
            {loading ?
              <CircularProgress color="inherit" sx={{ color: '#fff' }} />
              :
              'Login'
            }
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
              <div id="googlesignin" className="mx-auto"></div>
            </IconButton>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
