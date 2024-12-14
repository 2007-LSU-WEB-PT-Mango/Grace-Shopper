import React, {useEffect, useState} from 'react';
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

  
  const Cart = ({shoppingCart, setShoppingCart}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [update, setUpdate] = useState(false);
    const classes = useStyles();
      
    
    const total = () => {
        let rollingTotal = 0;
        if (shoppingCart && shoppingCart.products) {
            shoppingCart.products.map((product) => {
                rollingTotal = rollingTotal + (product.price * product.quantity)
                return rollingTotal
            })
        }
        setTotalPrice(rollingTotal);
    }
    
    
    const quantityTotal = () => {
        let rollingTotal = 0;
        if (shoppingCart && shoppingCart.products) {
            shoppingCart.products.map((product) => {
                rollingTotal = rollingTotal + product.quantity
                return rollingTotal
            })
        }
        setTotalQuantity(rollingTotal);
    }
    
    const totalDue = totalPrice+"00";
    
    useEffect(()=> {
        total()
        quantityTotal();
    }, [update])


    return (
        <div style={{padding: "20px"}}>
        <Grid
        container
        justify="center">
            <Grid>
                <h2 style={{color: "white"}}>Shopping Cart</h2>
                <hr></hr>
                {shoppingCart && shoppingCart.products?
                
                shoppingCart.products.map((product, index) => {
                    return (
                        <CartAlbum 
                            key={index}
                            product={product}
                            shoppingCart={shoppingCart}
                            classes={classes}
                            update={update}
                            setUpdate={setUpdate}
                            setShoppingCart={setShoppingCart}
                            total={total}
                            quantityTotal={quantityTotal}/>

                    )
                }
                )
                : <h2>Your cart is EMPTY</h2>}
            </Grid>
            {shoppingCart && shoppingCart.products?
            <Grid>
            <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Order Details
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h4">
                                items: {totalQuantity}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h4">
                                Total: ${totalPrice}
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
