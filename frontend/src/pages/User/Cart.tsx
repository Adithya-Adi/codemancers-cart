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
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import emptyCart from '../../assets/emptycart.jpg';
import { debounce } from 'lodash';
import { CartAPI } from '../../services/apis/cartAPI';
import toast from 'react-hot-toast';
import { ICartDetailsModel, IProductInCartModel, IResponse } from '../../utils/helpers';

const Cart = () => {
  // states
  const [cartDetails, setCartDetails] = useState<ICartDetailsModel | undefined>(undefined);;
  const [loading, setLoading] = useState<boolean>(false);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        setLoading(true);
        const getCartDetailsResponse: IResponse = await CartAPI.getUserCart(loggedInUser._id);
        setCartDetails(getCartDetailsResponse.data);
      } catch (error: any) {
        console.error('Error:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getCartDetails();
  }, [loggedInUser._id]);

  const debouncedUpdateCart = debounce(async (productId: string, quantity: number) => {
    try {
      const updatedCartData: IUpdateCartModel = { productId, quantity };
      await CartAPI.updateCart(loggedInUser._id, updatedCartData);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }, 500);

  const updateCartDetails = (updatedCartDetails: ICartDetailsModel) => {
    const totalPrice: number = updatedCartDetails.products.reduce((total: number, item: IProductInCartModel) => {
      return total + item.price * item.quantity;
    }, 0);
    setCartDetails({ ...updatedCartDetails, totalPrice });
  };

  const increaseQuantity = (productId: string) => {
    const updatedCartDetails: any = { ...cartDetails };
    const productIndex: number = updatedCartDetails.products.findIndex((item: IProductInCartModel) => item.productId === productId);
    if (productIndex !== -1) {
      updatedCartDetails.products[productIndex].quantity += 1;
      updateCartDetails(updatedCartDetails);
      debouncedUpdateCart(productId, updatedCartDetails.products[productIndex].quantity);
    }
  };

  const decreaseQuantity = (productId : string) => {
    const updatedCartDetails: any = { ...cartDetails };
    const productIndex: number = updatedCartDetails.products.findIndex((item: IProductInCartModel) => item.productId === productId);
    if (productIndex !== -1 && updatedCartDetails.products[productIndex].quantity > 1) {
      updatedCartDetails.products[productIndex].quantity -= 1;
      updateCartDetails(updatedCartDetails);
      debouncedUpdateCart(productId, updatedCartDetails.products[productIndex].quantity);
    }
  };

  const removeItem = async (productId: string) => {
    const updatedProductDetails: IProductInCartModel = cartDetails?.products.filter((item: IProductInCartModel) => item.productId !== productId);
    const updatedCartDetails: any = {
      ...cartDetails,
      products: updatedProductDetails,
    };
    updateCartDetails(updatedCartDetails);
    if (updatedProductDetails.length === 0) {
      setCartDetails(undefined);
    }
    try {
      const removeItemResponse: IResponse = await CartAPI.removeFromCart(loggedInUser._id, productId);
      toast.success(removeItemResponse.message);
    } catch (error: any) {
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
                {cartDetails?.products?.map((item: IProductInCartModel) => (
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
                  Total Amount: ₹{cartDetails?.totalPrice}
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

export interface IUpdateCartModel {
  productId : string,
  quantity: number,
}