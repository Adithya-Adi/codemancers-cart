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
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ErrorType, validateEmail, validatePassword } from '../../utils/validation';
import { AuthAPI } from '../../services/apis/authAPI';
import toast from 'react-hot-toast';
import { ILoginModel } from '../User/Login';
import { IValidationModel } from '../../components/Admin/ProductsForm';
import { IResponse } from '../../utils/helpers';

const AdminLogin: React.FC = () => {
  //states
  const [formData, setFormData] = useState<ILoginModel>({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<IValidationModel>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  // useeffects
  useEffect(() => {
    const loggedInUser: string | null = localStorage.getItem('loggedInAdmin');
    const token: string | null = localStorage.getItem('admin_token');
    if (loggedInUser && token) {
      navigate('/admin/products/view');
    }
  }, [navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const emailErrors: ErrorType = validateEmail(formData.email);
    const passwordErrors: ErrorType = validatePassword(formData.password);
    const errors: any = {
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
      const loginResponse: IResponse = await AuthAPI.adminLogin(formData);
      localStorage.setItem('admin_token', loginResponse.token);
      localStorage.setItem('loggedInAdmin', JSON.stringify(loginResponse.data));
      toast.success('Login Successfull')
      setTimeout(() => {
        navigate('/admin/products/view');
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
