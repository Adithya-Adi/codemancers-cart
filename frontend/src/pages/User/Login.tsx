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
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validation';
import { AuthAPI } from '../../services/apis/authAPI';
import toast from 'react-hot-toast';
import { IResponse } from '../../utils/helpers';
import { ErrorType } from '../../utils/validation';

interface CustomWindow extends Window {
  google: {
    accounts: any; 
  };
}

declare const window: CustomWindow;

const Login : React.FC = () => {  
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ILoginModel>({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<ILoginModel>({
    email: '',
    password: '',
  });

  const navigate: NavigateFunction = useNavigate();

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

  interface GoogleAuthType {
    credential: string;
  }
  
  const googleUserVerifyHandler = async ({ credential } : GoogleAuthType) => {
    try {
      setLoading(true);
      const loginResponse : IResponse = await AuthAPI.googleLogin(credential);
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('loggedInUser', JSON.stringify(loginResponse.data));
      toast.success(loginResponse.message)
      setTimeout(() => {
        navigate('/home');
        toast(`Hello ${loginResponse.data.email}!`, {
          icon: '👋',
        });
      }, 1000);
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const emailErrors: ErrorType = validateEmail(formData.email);
    const passwordErrors: ErrorType = validatePassword(formData.password);
    const errors : any = {
      ...emailErrors,
      ...passwordErrors,
    };
    setValidationErrors(errors);
    const hasErrors: boolean = Object.values(errors).some((error) => !!error);
    if (hasErrors) {
      return;
    }
    setLoading(true);
    try {
      const loginResponse : IResponse = await AuthAPI.userLogin(formData);
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('loggedInUser', JSON.stringify(loginResponse.data));
      toast.success(loginResponse.message)
      setTimeout(() => {
        navigate('/home');
        toast(`Hello ${loginResponse.data.email}!`, {
          icon: '👋',
        });
      }, 1000);
    } catch (error: any) {
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
            onChange={handleInputChange}
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
              <div id="googlesignin" className="mx-auto"></div>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

export interface ILoginModel {
  email: string,
  password: string,
}