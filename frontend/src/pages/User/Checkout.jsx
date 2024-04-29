import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Grid,
  IconButton,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { OrderAPI } from '../../services/apis/orderAPI';
import { CartAPI } from '../../services/apis/cartAPI';
import toast from 'react-hot-toast';
import {
  validateName,
  validatePostalCode,
  validateAddress,
  validateCity,
  validateCountry,
  validateEmail,
} from '../../utils/validation';

const CheckoutPage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // states
  const [loading, setLoading] = useState(false);
  const [initalLoading, setInitalLoading] = useState(false);

  const [cartDetails, setCartDetails] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    fullName: loggedInUser.fullName,
    email: loggedInUser.email,
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const navigate = useNavigate();
  const shippingCharge = 50.0;

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        setInitalLoading(true);
        const getCartDetailsResponse = await CartAPI.getUserCart(loggedInUser._id);
        setCartDetails(getCartDetailsResponse.data);
        if (getCartDetailsResponse.data.products.length === 0) {
          navigate('/cart');
        }
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setInitalLoading(false);
      }
    };
    getCartDetails();
  }, [loggedInUser._id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const fullNameErrors = validateName(billingDetails.fullName);
    const emailErrors = validateEmail(billingDetails.email);
    const addressErrors = validateAddress(billingDetails.address);
    const cityErrors = validateCity(billingDetails.city);
    const postalCodeErrors = validatePostalCode(billingDetails.postalCode);
    const countryErrors = validateCountry(billingDetails.country);
    const errors = {
      ...fullNameErrors,
      ...emailErrors,
      ...addressErrors,
      ...cityErrors,
      ...postalCodeErrors,
      ...countryErrors,
    };
    setValidationErrors(errors);
    const hasErrors = Object.values(errors).some((error) => !!error);
    if (hasErrors) {
      return;
    }
    setLoading(true);
    try {
      const orderResponse = await OrderAPI.createOrder({
        userId: loggedInUser._id,
        products: cartDetails.products,
        totalPrice: cartDetails.totalPrice + shippingCharge,
        billingDetails,
      });
      toast.success(orderResponse.message);
      await CartAPI.clearUserCart(loggedInUser._id);
      navigate('/home');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };


  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {initalLoading ?
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
        :
        <Container maxWidth='md' style={{ marginTop: '40px' }}>
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant='h4' gutterBottom>Checkout</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant='h6' gutterBottom>Billing Details</Typography>
                <form>
                  <TextField
                    label='Full Name'
                    name='fullName'
                    value={billingDetails.fullName}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                  />
                  <FormHelperText sx={{ color: 'red' }}>{validationErrors?.fullName}</FormHelperText>
                  <TextField
                    label='Email'
                    name='email'
                    type='email'
                    value={billingDetails.email}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                  />
                  <FormHelperText sx={{ color: 'red' }}>{validationErrors?.email}</FormHelperText>
                  <TextField
                    label='Address'
                    name='address'
                    value={billingDetails.address}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                  />
                  <FormHelperText sx={{ color: 'red' }}>{validationErrors?.address}</FormHelperText>
                  <TextField
                    label='City'
                    name='city'
                    value={billingDetails.city}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                  />
                  <FormHelperText sx={{ color: 'red' }}>{validationErrors?.city}</FormHelperText>
                  <TextField
                    label='Postal Code'
                    name='postalCode'
                    value={billingDetails.postalCode}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                  />
                  <FormHelperText sx={{ color: 'red' }}>{validationErrors?.postalCode}</FormHelperText>
                  <TextField
                    label='Country'
                    name='country'
                    value={billingDetails.country}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                  />
                  <FormHelperText sx={{ color: 'red' }}>{validationErrors?.country}</FormHelperText>
                </form>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant='h6' gutterBottom>Order Summary</Typography>
                <Divider />
                <Box mt={2}>
                  <Typography variant='body1' mt={'10px'}>
                    {cartDetails?.products?.map((item) => (
                      <Typography key={item.productId} variant='body1'>{item.title} x {item.quantity}</Typography>
                    ))}
                  </Typography>
                  <Divider />
                  <Typography variant='body1' mt={2}>Shipping Charge: ₹{shippingCharge.toFixed(2)}</Typography>

                  <Typography variant='h6' mt={'10px'}>
                    Total Amount: ₹{(cartDetails?.totalPrice + shippingCharge).toFixed(2)}
                  </Typography>
                  <Button variant='contained' color='primary' onClick={handlePlaceOrder} style={{ marginTop: '20px', width: '100%' }}>

                    {loading ?
                      <CircularProgress color="inherit" sx={{ color: '#fff' }} />
                      :
                      'Place Order'
                    }
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      }
    </>
  );
};

export default CheckoutPage;
