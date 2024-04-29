import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Divider,
  CircularProgress,
} from '@mui/material';
import CartCard from '../../components/User/CartCard';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import emptyCart from '../../assets/emptycart.jpg';
import { debounce } from 'lodash';
import { CartAPI } from '../../services/apis/cartAPI';
import toast from 'react-hot-toast';

const Cart = () => {
  // states
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const navigate = useNavigate();

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        setLoading(true);
        const getCartDetailsResponse = await CartAPI.getUserCart(loggedInUser._id);
        setCartDetails(getCartDetailsResponse.data);
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getCartDetails();
  }, [loggedInUser._id]);

  const debouncedUpdateCart = debounce(async (productId, quantity) => {
    try {
      const updatedCartData = { productId, quantity };
      await CartAPI.updateCart(loggedInUser._id, updatedCartData);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, 500);

  const updateCartDetails = (updatedCartDetails) => {
    const totalPrice = updatedCartDetails.products.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setCartDetails({ ...updatedCartDetails, totalPrice });
  };

  const increaseQuantity = (productId) => {
    const updatedCartDetails = { ...cartDetails };
    const productIndex = updatedCartDetails.products.findIndex(item => item.productId === productId);
    if (productIndex !== -1) {
      updatedCartDetails.products[productIndex].quantity += 1;
      updateCartDetails(updatedCartDetails);
      debouncedUpdateCart(productId, updatedCartDetails.products[productIndex].quantity);
    }
  };

  const decreaseQuantity = (productId) => {
    const updatedCartDetails = { ...cartDetails };
    const productIndex = updatedCartDetails.products.findIndex(item => item.productId === productId);
    if (productIndex !== -1 && updatedCartDetails.products[productIndex].quantity > 1) {
      updatedCartDetails.products[productIndex].quantity -= 1;
      updateCartDetails(updatedCartDetails);
      debouncedUpdateCart(productId, updatedCartDetails.products[productIndex].quantity);
    }
  };

  const removeItem = async (productId) => {
    const updatedProductDetails = cartDetails.products.filter(item => item.productId !== productId);
    const updatedCartDetails = {
      ...cartDetails,
      products: updatedProductDetails,
    };
    updateCartDetails(updatedCartDetails);
    if (updatedProductDetails.length === 0) {
      setCartDetails(null);
    }
    try {
      const removeItemResponse = await CartAPI.removeFromCart(loggedInUser._id, productId);
      toast.success(removeItemResponse.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <>
      {loading ?
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
        :
        <Box p={4}>
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" mb={2}>
            Your cart items
          </Typography>
          <Divider sx={{ marginBottom: 4 }} />
          {cartDetails === null ? (
            <Box textAlign="center">
              <img
                src={emptyCart}
                alt="Empty Cart"
                style={{ marginBottom: '16px', maxWidth: '300px', width: '100%' }}
              />
              <Typography variant="body1">Your cart is empty.</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={2}>
                {cartDetails?.products?.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.productId}>
                    <CartCard
                      item={item}
                      increaseQuantity={() => increaseQuantity(item.productId)}
                      decreaseQuantity={() => decreaseQuantity(item.productId)}
                      removeItem={() => removeItem(item.productId)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ marginTop: 4 }} />
              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Typography variant="h6" mr={2}>
                  Total Amount: ₹{cartDetails.totalPrice}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleCheckout}>
                  Checkout
                </Button>
              </Box>
            </>
          )}
        </Box>
      }
    </>
  );
};

export default Cart;
