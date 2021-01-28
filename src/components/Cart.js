import React, { useState, useEffect } from 'react';
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
// import { Link } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
import App from './Stripe';
import {checkCart, removeItemCart, quantityUpdate} from '../api';


// const stripePromise = loadStripe("pk_test_51ICFMDCJh48L0M91LcpLLqnG895c9gQydCsdE1auAYJTqNhbskPhk4ULxKoDeuniL5BEADGKBAKbkpEPxRZyx1A600wtU2xF1J");


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

const Cart = ({cart}) => {
    const classes = useStyles();
    const [order, setOrder] =useState([]);

    useEffect(() => {
        setOrder(cart.products)
    }, [cart.products])
    
    console.log(order)
    
    const total = () => {
        let rollingTotal = 0;
        if (cart.length >0) {
            cart.map((product) => {
                rollingTotal = rollingTotal + (product.price * product.quantity)
            })
        }
        return rollingTotal;
    }

    const totalDue = total()+"00";

    const quantitiyTotal = () => {
        let rollingTotal = 0;
        cart.map((product) => {
            rollingTotal = rollingTotal + product.quantity
        })
        return rollingTotal;
    }
    

    

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
                {cart.map((product) => {
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
                                        value={product.quantity}
                                        onChange={()=> {
                                            try {
                                                quantityUpdate(order.id, product.id, product.quantity)
                                                console.log("updating quant")
                                            } catch (error) {
                                                throw error};
                                        }}>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select>
                                        <FormHelperText>quantity</FormHelperText>
                                    </FormControl>
                                    <Button variant="contained" disableRipple={true}
                                        onClick={() => {
                                            try {
                                                removeItemCart(order.id, product.id)
                                                console.log("removed item!")
                                            } catch (error) {
                                                throw error
                                            };
                                        }}>
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
                                items: {quantitiyTotal()}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h4">
                                Total: ${total()}
                            </Typography>

                            {/* stripe integration */}
                            <App cart={totalDue}/>

                        </CardContent>
                    </Card>
        </Grid>
        </Grid>
        </div>
    )
}

export default Cart;
