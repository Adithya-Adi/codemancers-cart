import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate, NavigateFunction } from 'react-router-dom';

const NavBar : React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <AppBar position='static' sx={{ marginBottom: '30px' }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, color: '#fff' }} onClick={() => navigate('/home')}>
          <IconButton color='inherit' sx={{ color: 'red' }}>Codemancers-Cart </IconButton>
        </Typography>
        <IconButton
          size='large'
          edge='end'
          color='inherit'
          aria-label='cart'
          onClick={() => navigate('/cart')}
          sx={{marginRight: 2}}
        >
          <ShoppingCartIcon />
        </IconButton>
        <Button color="inherit" startIcon={<ExitToAppIcon />} onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
