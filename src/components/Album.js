import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToOrder } from "../api";
import AddAlerts from "./Alert";

// Material U-I imports
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Fade,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    maxWidth: 270,
    padding: 10,
    margin: 10,
    flexGrow: 1,
    alignItems: "center",
    justifyItems: "center"
  },
  media: {
    height: 250,
  },
  action: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    paper: {
      // padding: theme.spacing(2),
      textAlign: "center",
      // color: theme.palette.text.secondary,
    },
  },
});

const Album = (props) => {
  const {
    ID,
    name,
    description,
    price,
    imageURL,
    inStock,
    category,
    trackList,
    singleAlbum,
    shoppingCart,
    setShoppingCart,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const newProduct = {
    category,
    description,
    id: ID,
    imageURL,
    inStock,
    name,
    price,
    quantity: 1,
    trackList,
  };

  function productPage() {
    return "/products/" + ID;
  }

  function tracks() {
    for (let i =0; i<trackList.length; i++) {
      console.log(trackList[i])
      return <p>{trackList.i}</p>}}

      
  return (
    <>
      <div style={{display: "flex", flexDirection: "row", ju: "center"}}>
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
              <Typography gutterBottom variant="h6" component="h4">
                {category}
              </Typography>
            </CardContent>

            {inStock ? (
              <Button
                fullWidth
                className={classes.action}
                onClick={() => {
                  shoppingCart.products.push(newProduct);
                  setShoppingCart(shoppingCart);
                  addToOrder(shoppingCart.id, ID);
                  setOpen(true);
                }}
              >
                <AddShoppingCartIcon />
                ADD TO CART
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                disableRipple={true}
                disabled
              >
                <NotInterestedIcon />
                SOLD OUT
              </Button>
            )}
            <AddAlerts open={open} setOpen={setOpen} />
          </Card>
        </Fade>

        {singleAlbum == true ? (
          <Card className={classes.root}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h4">
                <h4>Album Tracklist</h4>
                {tracks()}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  );
};

export default Album;
