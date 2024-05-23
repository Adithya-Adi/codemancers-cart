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
import { IProductModel, ICartDetailsModel, IResponse, IProductInCartModel } from '../../utils/helpers';

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


const ProductCard : React.FC<ProductCartPropTypes> = ({ product, cartDetails }: ProductCartPropTypes) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const { _id, title, price, image, description } = product;
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  useEffect(() => {
    const isIn = cartDetails?.products?.some((item: IProductInCartModel) => item.productId === _id)
    setIsInCart(isIn);
  }, [_id, cartDetails]);

  const handleAddToCart = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const addToCartResponse : IResponse = await CartAPI.addToCart(loggedInUser._id, _id);
      toast.success(addToCartResponse.message);
      setIsInCart(true);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const removeFromCartResponse: IResponse = await CartAPI.removeFromCart(loggedInUser._id, _id)
      toast.success(removeFromCartResponse.message);
      setIsInCart(false);
    } catch (error: any) {
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

interface ProductCartPropTypes {
  product: IProductModel,
  cartDetails : ICartDetailsModel | undefined,
}