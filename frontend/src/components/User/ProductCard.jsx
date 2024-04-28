import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';

const ProductCard = ({ product }) => {
  const { name, price, image, description } = product;

  return (
    <Card>
      <CardMedia component='img' height='200' image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary' style={{ textDecoration: 'none' }}>
          {description}
        </Typography>
        <Box display='flex' alignItems='center' mt={2}>
          <Typography variant='body1' fontWeight='bold'>
            ₹{price}
          </Typography>

        </Box>
        <Box mt={2}>
          <Button variant='contained' color='primary'>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
