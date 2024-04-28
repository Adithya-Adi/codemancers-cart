import { useState } from "react";
import { Container, Box, Typography, TextField, Button, Paper, Divider } from "@mui/material";

const CheckoutPage = () => {
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
    // Logic to handle placing the order
    console.log("Placing order:", billingDetails);
  };

  // Example shipping charge
  const shippingCharge = 10.0;
  // Example total items
  const totalItems = 3;

  // Example cart items
  const cartItems = [
    { id: 1, name: "Men's Casual Shirt", price: 29.99, quantity: 1 },
    { id: 2, name: "Women's Running Shoes", price: 49.99, quantity: 2 },
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Box display="flex" justifyContent="space-between">
        <Box width="60%">
          <Typography variant="h6" gutterBottom>Billing Details</Typography>
          <form>
            <TextField
              label="Full Name"
              name="fullName"
              value={billingDetails.fullName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={billingDetails.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={billingDetails.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={billingDetails.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Postal Code"
              name="postalCode"
              value={billingDetails.postalCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={billingDetails.country}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </form>
        </Box>
        <Box width="35%">
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <Divider />
            <Box mt={2}>
              <Typography variant="body1" mt={'10px'}>
                {cartItems.map((item) => (
                  <Typography key={item.id} variant="body1">{item.name} x {item.quantity}</Typography>
                ))}
              </Typography>
              <Divider />
              <Typography variant="body1" mt={2}>Shipping Charge: ₹{shippingCharge.toFixed(2)}</Typography>

              <Typography variant="h6" mt={'10px'}>
                Total Amount: ₹{(totalItems + shippingCharge).toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" onClick={handlePlaceOrder} style={{ marginTop: "20px", width: "100%" }}>
                Place Order
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
