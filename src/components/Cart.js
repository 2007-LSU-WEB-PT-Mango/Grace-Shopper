import React, { useState, useEffect } from 'react';
import {Grid, 
        Card, 
        CardMedia, 
        CardContent, 
        Typography, 
        CardActionArea, 
        Button, 
        MenuItem, 
        FormHelperText, 
        FormControl, 
        Select, 
        Fade} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import App from './Stripe';
import {removeItemCart, quantityUpdate} from '../api';



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

const Cart = ({cart, order, setOrder}) => {
    
    const classes = useStyles();
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        setOrder(cart.products)
    })
    
    
    const total = () => {
        let rollingTotal = 0;
        if (order && order.length >0) {
            order.map((product) => {
                rollingTotal = rollingTotal + (product.price * product.quantity)
                return rollingTotal
            })
        }
        return rollingTotal;
    }

    const totalDue = total()+"00";

    const quantitiyTotal = () => {
        let rollingTotal = 0;
        if (order && order.length > 0) {
            order.map((product) => {
                rollingTotal = rollingTotal + product.quantity
                return rollingTotal
            })
        }
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
                {order && order.length > 0?
                
                order.map((product) => {
                    return (
                        <>
                        <Fade in={checked}>
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
                                                removeItemCart(cart.id, product.id)
                                                setChecked(false);
                                            } catch (error) {
                                                throw error
                                            };
                                        }}>
                                        Remove
                                    </Button>
                                </Grid>
                            </CardActionArea>
                        </Card>
                        </Fade>
                        </>
                    )
                }
                )
                : <h2>Your cart is EMPTY</h2>}
            </Grid>
            {order && order.length>0?
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
        : null}
        </Grid>
        </div>
    )
}

export default Cart;
