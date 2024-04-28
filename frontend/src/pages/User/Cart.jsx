import { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import CartCard from '../../components/User/CartCard';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import emptyCart from '../../assets/emptycart.jpg';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: `Men's Casual Shirt`, price: 299, quantity: 1, image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png' },
    { id: 2, name: `Women's Running Shoes`, price: 499, quantity: 2, image: 'https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png' },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout')
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box p={4}>
      <IconButton onClick={handleBack}>
        <ArrowBack />
      </IconButton>
      <Typography variant='h4' mb={4}>
        Your cart items
      </Typography>
      {cartItems.length === 0 ? (
        <Box textAlign='center'>
          <img src={emptyCart} alt='Empty Cart' style={{ marginBottom: '16px', maxWidth: '300px', width: '100%' }} />
          <Typography variant='body1'>Your cart is empty.</Typography>
        </Box>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
            />
          ))}
          <Box display='flex' justifyContent='flex-end' mt={4}>
            <Typography variant='h6' mr={2}>
              Total Amount: ₹{getTotalAmount()}
            </Typography>
            <Button variant='contained' color='primary' onClick={handleCheckout}>
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
