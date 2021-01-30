import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {addToOrder} from '../api';
import AddAlerts from './Alert';

// Material U-I imports
import {Card, CardMedia, CardContent, Typography, Fade, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const useStyles = makeStyles({
  root: {
    maxWidth: 270,
    padding: 10,
    margin: 10,
  },
  media: {
    height: 250,
  },
  action: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

const Album = (props) => {
  const { ID, name, description, price, imageURL, inStock, category, shoppingCart, setShoppingCart } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // console.log('order in album: ', order)
  // console.log('cart in album: ', cart)

  const newProduct = {
    category,
    description,
    id: ID,
    imageURL,
    inStock,
    name,
    price,
    quantity: 1
  };

  function productPage() {
    return ("/products/"+ID)
  }
  return (
    <>
      <Fade in={true}>
        <Card className={classes.root}>
        <Link to={productPage()}>
          <CardMedia
            className={classes.media}
            image={imageURL}
            title="Vinyl Record Stock Thumbnail"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h3">
            {description}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4">
            ${price}
          </Typography>
        </CardContent>
          {inStock ? (
            <Button fullWidth
              className={classes.action}
              onClick={() => {
                  
                  shoppingCart.products.push(newProduct)
                  setShoppingCart(shoppingCart)
                  addToOrder(shoppingCart.id, ID)
                  setOpen(true)
                  
              }}
              >
              <AddShoppingCartIcon />
              ADD TO CART
            </Button>)
           : (
            <Button fullWidth variant="contained" disableRipple={true} disabled>
              <NotInterestedIcon />
              SOLD OUT
            </Button>
          )}
          <AddAlerts open={open} setOpen={setOpen} />
      </Card>
      </Fade>
    </>
  );
};

export default Album;
