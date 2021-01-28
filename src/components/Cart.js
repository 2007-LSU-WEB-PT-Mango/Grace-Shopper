import React, { useEffect } from 'react';
import {Grid, 
        Card, 
        CardContent, 
        Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import App from './Stripe';
import CartAlbum from './CartAlbum';



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
        justify="center">
            <Grid>
                <h2>Shopping Cart</h2>
                <hr></hr>
                {order && order.length > 0?
                
                order.map((product, index) => {
                    return (
                        <CartAlbum 
                            key={index}
                            product={product}
                            cart={cart}
                            order={order}
                            classes={classes}/>
                    )
                }
                )
                : <h2>Your cart is EMPTY</h2>}
            </Grid>
            {order && order.length>0?
            <Grid>
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
