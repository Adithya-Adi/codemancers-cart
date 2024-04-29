import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  addProduct,
  removeProduct,
  selectProducts
} from '../../services/state/slices/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';

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


const ProductCard = ({ product }) => {
  const { _id, title, price, image, description } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectProducts);

  const isInCart = cartItems.some(item => item.productId === _id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    toast.success('Added to cart');
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    dispatch(removeProduct(_id));
    toast.success('Removed from cart');
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

