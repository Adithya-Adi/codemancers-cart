import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';
import { CartAPI } from '../../services/apis/cartAPI';
import { useEffect, useState } from 'react';

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const StyledCardMedia = styled(CardMedia)(() => ({
  paddingTop: '100%',
  backgroundColor: '#f0f0f0',
  objectFit: 'cover',
}));

const StyledCardContent = styled(CardContent)(() => ({
  flexGrow: 1,
}));


const ProductCard = ({ product, cartDetails }) => {
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState([]);
  const { _id, title, price, image, description } = product;
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    const isIn = cartDetails?.products?.some(item => item.productId === _id)
    setIsInCart(isIn);
  }, [_id, cartDetails]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const addToCartResponse = await CartAPI.addToCart(loggedInUser._id, _id);
      toast.success(addToCartResponse.message);
      setIsInCart(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const removeFromCartResponse = await CartAPI.removeFromCart(loggedInUser._id, _id)
      toast.success(removeFromCartResponse.message);
      setIsInCart(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledCard>
      <StyledCardMedia image={image} title={title} />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </StyledCardContent>
      <Box mt="auto" p={2}>
        <Typography variant="h6">
          ₹{price}
        </Typography>
        {isInCart ? (
          <Button variant='contained' color='secondary' onClick={handleRemoveFromCart} fullWidth>
            {loading ?
              <CircularProgress color="inherit" sx={{ color: '#fff' }} />
              :
              'Remove from Cart'
            }
          </Button>
        ) : (
          <Button variant='contained' color='primary' onClick={handleAddToCart} fullWidth>
            {loading ?
              <CircularProgress color="inherit" sx={{ color: '#fff' }} />
              :
              'Add to Cart'
            }
          </Button>
        )}
      </Box>
    </StyledCard>
  );
};

export default ProductCard;
