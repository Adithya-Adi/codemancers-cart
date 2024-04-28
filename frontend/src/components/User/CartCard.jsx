import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const CartCard = ({ item, increaseQuantity, decreaseQuantity, removeItem }) => {
  return (
    <Card variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CardMedia 
            component="img" 
            image={item.image} 
            alt={item.name} 
            style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{item.name}</Typography>
            <Typography variant="body2" color="textSecondary">Price: ₹{item.price}</Typography>
            <Typography variant="body2" color="textSecondary">Quantity:</Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => decreaseQuantity(item.id)}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" style={{ margin: "0 8px" }}>{item.quantity}</Typography>
              <IconButton onClick={() => increaseQuantity(item.id)}>
                <AddIcon />
              </IconButton>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button size="small" color="error" onClick={() => removeItem(item.id)}>
              <DeleteIcon /> Remove
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartCard;
