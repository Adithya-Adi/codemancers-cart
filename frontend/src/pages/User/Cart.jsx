import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import CartCard from '../../components/User/CartCard';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import emptyCart from '../../assets/emptycart.jpg';
import {
  selectProducts,
  addQuantity,
  subQuantity,
  removeProduct,
} from '../../services/state/slices/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectProducts);

  const increaseQuantity = (id) => {
    dispatch(addQuantity(id));
  };

  const decreaseQuantity = (id) => {
    dispatch(subQuantity(id));
  };

  const removeItem = (id) => {
    dispatch(removeProduct(id));
    toast.success('Item removed');
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <Box p={4}>
      <IconButton onClick={handleBack}>
        <ArrowBack />
      </IconButton>
      <Typography variant='h4' mb={2}>
        Your cart items
      </Typography>
      <Divider sx={{ marginBottom: 4 }} />
      {cartItems.length === 0 ? (
        <Box textAlign='center'>
          <img src={emptyCart} alt='Empty Cart' style={{ marginBottom: '16px', maxWidth: '300px', width: '100%' }} />
          <Typography variant='body1'>Your cart is empty.</Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.productId}>
                <CartCard
                  item={item}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeItem={removeItem}
                />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ marginTop: 4 }} />
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
