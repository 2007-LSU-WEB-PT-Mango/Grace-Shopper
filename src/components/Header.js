import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

// material ui imports
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, MenuItem, Menu} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  // const { history } = props;
  const { isLoggedIn, setIsLoggedIn, cart, setOrder } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {

    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/products" style={{"textDecoration": "none", "color": "white"}}>
            Mango's Vinyl Store
            </Link>
          </Typography>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="default"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            {isLoggedIn ? (
              <LogoutButton
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : null}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClick('/register');
                }}
              >
                <Link to="/register">Register</Link>
              </MenuItem>

              <MenuItem onClick={() => handleMenuClick('/login')}>
                <Link to="/login">Log In</Link>
              </MenuItem>

              <MenuItem onClick={() => handleMenuClick('/dashboard')}>
                <Link to="/dashboard">Dashboard</Link>
              </MenuItem>

              <MenuItem onClick={() => handleMenuClick('/products')}>
                <Link to="/products">Products</Link>
              </MenuItem>
              <MenuItem onClick={() => {
                  handleMenuClick('/cart');
                  setOrder(cart.products);}}>
                <Link to="/cart">Cart</Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
