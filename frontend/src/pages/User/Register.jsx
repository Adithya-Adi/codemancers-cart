/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  Box,
  Link,
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
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
  validatePassword,
  validateConfirmPassword,
} from '../../utils/validation';
import { AuthAPI } from '../../services/apis/authAPI';
import toast from 'react-hot-toast';

const Register = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    cpassword: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    cpassword: '',
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
      setLoading(true);
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
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailErrors = validateEmail(formData.email);
    const fullNameErrors = validateName(formData.fullName);
    const phoneNumberErrors = validatePhoneNumber(formData.phoneNumber);
    const passwordErrors = validatePassword(formData.password);
    const cpasswordErrors = validateConfirmPassword(formData.password, formData.cpassword);
    const errors = {
      ...fullNameErrors,
      ...emailErrors,
      ...phoneNumberErrors,
      ...passwordErrors,
      ...cpasswordErrors,
    };
    setValidationErrors(errors);
    const hasErrors = Object.values(errors).some((error) => !!error);
    if (hasErrors) {
      return;
    }
    setLoading(true);
    try {
      const registerResponse = await AuthAPI.userRegister(formData);
      toast.success(registerResponse.message);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }

  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          border: '2px solid #ccc',
          padding: '20px',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Typography variant='h2' align='center' gutterBottom>
          Register
        </Typography>
        <form style={{ width: '100%' }} method='post'>
          <TextField
            fullWidth
            id='fullName'
            name='fullName'
            label='Full Name'
            variant='outlined'
            margin='normal'
            onChange={(e) => handleInputChange(e)}
          />
          <FormHelperText sx={{ color: 'red' }}>{validationErrors?.fullName}</FormHelperText>

          <TextField
            fullWidth
            id='email'
            name='email'
            label='Email'
            variant='outlined'
            margin='normal'
            onChange={(e) => handleInputChange(e)}
          />
          <FormHelperText sx={{ color: 'red' }}>{validationErrors?.email}</FormHelperText>

          <TextField
            fullWidth
            id='phoneNumber'
            name='phoneNumber'
            label='Phone Number'
            variant='outlined'
            margin='normal'
            onChange={(e) => handleInputChange(e)}
          />
          <FormHelperText sx={{ color: 'red' }}>{validationErrors?.phoneNumber}</FormHelperText>

          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            variant='outlined'
            type='password'
            margin='normal'
            onChange={(e) => handleInputChange(e)}
          />
          <FormHelperText sx={{ color: 'red' }}>{validationErrors?.password}</FormHelperText>

          <TextField
            fullWidth
            id='cpassword'
            name='cpassword'
            label='Confirm Password'
            variant='outlined'
            type='password'
            margin='normal'
            onChange={(e) => handleInputChange(e)}
          />
          <FormHelperText sx={{ color: 'red' }}>{validationErrors?.cpassword}</FormHelperText>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            style={{ marginTop: '20px' }}
            onClick={handleRegister}
          >
            {loading ?
              <CircularProgress color="inherit" sx={{ color: '#fff' }} />
              :
              'Login'
            }
          </Button>
          <Typography variant='body2' align='center' mt={2} mb={3}>
            Already have an account?{' '}
            <Link component={RouterLink} to='/'>
              Login
            </Link>
          </Typography>
          <Divider />
          {/* Social login */}
          <Typography variant='body2' align='center' mt={2}>
            Or register with
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <div id="googlesignin" className="mx-auto"></div>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
