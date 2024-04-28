import { AppBar, Toolbar, IconButton, Typography, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = () => {
  const cartItemCount = 3;

  return (
    <AppBar position="static" sx={{ marginBottom: '30px' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
          Codemancers-Cart
        </Typography>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="cart"
        >
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
