import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Remove as RemoveIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IProductInCartModel } from '../../utils/helpers';

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  justifyContent: 'space-between',
}));

const StyledCardContent = styled(CardContent)(() => ({
  flex: '1 1 auto',
  padding: 2
}));


const CartCard: React.FC<CartCardPropsType> = ({ item, increaseQuantity, decreaseQuantity, removeItem } : CartCardPropsType) => {
  const { title, price, image, quantity } = item;

  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ width: 150, objectFit: 'cover', flexShrink: 0 }}
      />
      <StyledCardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: ₹{price}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <IconButton onClick={() => decreaseQuantity(item.productId)}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1">{quantity}</Typography>
          <IconButton onClick={() => increaseQuantity(item.productId)}>
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => removeItem(item.productId)}
          sx={{ mt: 1 }}
        >
          Remove
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};

export default CartCard;

interface CartCardPropsType {
  item : IProductInCartModel,
  increaseQuantity: (productId: string) => void,
  decreaseQuantity : (productId: string) => void,
  removeItem : (productId: string) => void,
}