import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AdminNavBar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      localStorage.clear('loggedInAdmin');
      localStorage.clear('admin_token');
      navigate('/admin');
      window.location.reload();
    }
  };


  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap onClick={() => navigate('/admin/products/view')}>
          <IconButton color='inherit'>Codemancers-Cart </IconButton>
        </Typography>
      </Box>
      <Drawer
        variant='temporary'
        anchor='left'
        open={menuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem
            component={Link}
            to='/admin/products/view'
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: location.pathname === '/admin/products/view' ? 'rgba(0, 0, 0, 0.08)' : 'transparent'
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary='Products' />
          </ListItem>
          <ListItem
            component={Link}
            to='/admin/users'
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: location.pathname === '/admin/users' ? 'rgba(0, 0, 0, 0.08)' : 'transparent'
            }}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Users' />
          </ListItem>

          <ListItem
            onClick={handleLogout}
            component={Link}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default AdminNavBar;
