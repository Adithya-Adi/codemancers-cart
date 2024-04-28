import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Grid,
  IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    console.log(billingDetails);
  };

  const shippingCharge = 10.0;
  const totalItems = 3;

  // Example cart items
  const cartItems = [
    { id: 1, name: `Men's Casual Shirt`, price: 29.99, quantity: 1 },
    { id: 2, name: `Women's Running Shoes`, price: 49.99, quantity: 2 },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  return (
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
              <TextField
                label='Email'
                name='email'
                type='email'
                value={billingDetails.email}
                onChange={handleChange}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Address'
                name='address'
                value={billingDetails.address}
                onChange={handleChange}
                fullWidth
                margin='normal'
              />
              <TextField
                label='City'
                name='city'
                value={billingDetails.city}
                onChange={handleChange}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Postal Code'
                name='postalCode'
                value={billingDetails.postalCode}
                onChange={handleChange}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Country'
                name='country'
                value={billingDetails.country}
                onChange={handleChange}
                fullWidth
                margin='normal'
              />
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant='h6' gutterBottom>Order Summary</Typography>
            <Divider />
            <Box mt={2}>
              <Typography variant='body1' mt={'10px'}>
                {cartItems.map((item) => (
                  <Typography key={item.id} variant='body1'>{item.name} x {item.quantity}</Typography>
                ))}
              </Typography>
              <Divider />
              <Typography variant='body1' mt={2}>Shipping Charge: ₹{shippingCharge.toFixed(2)}</Typography>

              <Typography variant='h6' mt={'10px'}>
                Total Amount: ₹{(totalItems + shippingCharge).toFixed(2)}
              </Typography>
              <Button variant='contained' color='primary' onClick={handlePlaceOrder} style={{ marginTop: '20px', width: '100%' }}>
                Place Order
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
