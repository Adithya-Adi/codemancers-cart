import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
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
  const { _id, title, price, image, description } = product;
  const [isInCart, setIsInCart] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    const isIn = cartDetails?.products?.some(item => item.productId === _id)
    setIsInCart(isIn);
  }, [_id, cartDetails]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const addToCartResponse = await CartAPI.addToCart(loggedInUser._id, _id);
      toast.success(addToCartResponse.message);
      setIsInCart(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveFromCart = async (e) => {
    e.preventDefault();
    try {
      const removeFromCartResponse = await CartAPI.removeFromCart(loggedInUser._id, _id)
      toast.success(removeFromCartResponse.message);
      setIsInCart(false);
    } catch (error) {
      toast.error(error.response.data.message);
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
            Remove from Cart
          </Button>
        ) : (
          <Button variant='contained' color='primary' onClick={handleAddToCart} fullWidth>
            Add to Cart
          </Button>
        )}
      </Box>
    </StyledCard>
  );
};

export default ProductCard;
