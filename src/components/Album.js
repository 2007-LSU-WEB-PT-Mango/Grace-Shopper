import React from 'react';

// Material U-I imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
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
  const { name, description, price, imageURL, inStock, category } = props;
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={imageURL}
          title="Vinyl Record Stock Thumbnail"
        />
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
        <CardActionArea className={classes.action}>
          {inStock ? (
            <Button fullWidth>
              <AddShoppingCartIcon />
              ADD TO CART
            </Button>
          ) : (
            <Button fullWidth variant="contained" disableRipple={true} disabled>
              <NotInterestedIcon />
              SOLD OUT
            </Button>
          )}
        </CardActionArea>
      </Card>
    </>
  );
};

export default Album;
