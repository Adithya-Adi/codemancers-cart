import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Button,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const { name, price, rating, image, description } = product;

  return (
    <Card>
      {/* <CardActionArea component="div"> */}
      <CardMedia component="img" height="200" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ textDecoration: 'none' }}>
          {description}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="body1" fontWeight="bold">
            ₹{price}
          </Typography>
          <Box ml={2}>
            <Rating value={rating} precision={0.1} readOnly />
          </Box>
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </Box>
      </CardContent>
      {/* </CarydActionArea> */}
    </Card>
  );
};

export default ProductCard;
