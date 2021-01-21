import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      padding: 10,
      margin: 10,
      
    },
    media: {
      height: 100,
    }
  });

const Cart = () => {
    const classes = useStyles();

    const total = () => {
        let rollingTotal = 0;
        dummyCart.map((product) => {
            rollingTotal = rollingTotal + (product.price * product.quantity)
        })
        return rollingTotal;
    }

    // need to pull in cart from database, update state of quantitiy 
    let dummyCart = [
        {
            name: 'Circles (Deluxe)',
            description: 'Mac Miller',
            price: 35,
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqColF4inSfJAhwt1uMwLvUjLWi50wZLHuM-K0fNY_4_Mh4CrO5C3OiMl91wdD7SxMn8-sNA&usqp=CAc',
            quantity: 4
        },
        {
            name: 'Abbey Road',
            description: 'The Beatles',
            price: 20,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/81dUVKQDBEL._SL1200_.jpg',
            quantity: 1
        }
        ]

    return (
        <div style={{padding: "20px"}}>
        <Grid
        container
        direction="row"
        justify="center">
            <Grid
            direction="column"
            justify="flex-start"
            alignItems="center"
            >
                <h2>Shopping Cart</h2>
                <hr></hr>
                {dummyCart.map((product) => {
                    return (
                        <>
                        <Card
                            className={classes.root}
                            >
                            <CardMedia
                                className={classes.media}
                                image={product.imageURL}
                                title="Vinyl Record Stock Thumbnail"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.name} ${product.price}
                                </Typography>
                            </CardContent>
                            <CardActionArea>
                                <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center">

                                    <FormControl className={classes.formControl}>
                                        <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={product.quantity}
                                        // onChange={handleChange} need to write
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select>
                                        <FormHelperText>quantity</FormHelperText>
                                    </FormControl>
                                    <Button variant="contained" disableRipple={true}>
                                        Remove
                                    </Button>
                                </Grid>
                            </CardActionArea>
                        </Card>
                        </>
                    )
                })}
            </Grid>
            <Grid
        justify="flex-start"
        alignItems="center">
            <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Order Details
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h4">
                                items: {dummyCart.length}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h4">
                                Total: ${total()}
                            </Typography>
                            <Button color="primary" variant="contained" fullWidth>
                                Submit Order
                            </Button>
                        </CardContent>
                    </Card>
        </Grid>
        </Grid>
        </div>
    )
}

export default Cart;
