import React from 'react';
import { Link } from "react-router-dom";
import {addToOrder} from '../api';

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
  const { ID, name, description, price, imageURL, inStock, cart } = props;
  const classes = useStyles();

  

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

                  addToOrder(cart.id, ID)
                
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
      </Fade>
    </>
  );
};

export default Album;
