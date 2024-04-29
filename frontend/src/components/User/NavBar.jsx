import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the ExitToAppIcon
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
  selectTotalItems,
} from '../../services/state/slices/cartSlice';

const NavBar = () => {
  const navigate = useNavigate();
  const cartItemCount = useSelector(selectTotalItems);

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      localStorage.clear('loggedInUser');
      localStorage.clear('token');
      navigate('/');
    }
  };

  return (
    <AppBar position='static' sx={{ marginBottom: '30px' }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, color: '#fff' }} onClick={() => navigate('/home')}>
          <IconButton color='inherit'>Codemancers-Cart </IconButton>
        </Typography>
        <IconButton
          size='large'
          edge='end'
          color='inherit'
          aria-label='cart'
          onClick={() => navigate('/cart')}
        >
          <Badge badgeContent={cartItemCount} color='error' sx={{ marginRight: 3 }}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Button color="inherit" startIcon={<ExitToAppIcon />} onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
