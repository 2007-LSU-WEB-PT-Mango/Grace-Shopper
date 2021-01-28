import React, { useState } from 'react';

// Material U-I imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { Link } from "react-router-dom";


import {addToOrder} from '../api';

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
  const { ID, name, description, price, imageURL, inStock, cart } = props;
  const classes = useStyles();

  if (cart) {
    const orderID = cart.id;
  }

  function productPage() {
    return ("/products/"+ID)
  }
  return (
    <>
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
                  console.log(ID)
                  // addToOrder({orderID, ID})
                  console.log("adding to cart")
                  console.log("ID:",ID, cart)
                
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
      </Card>
    </>
  );
};

export default Album;
