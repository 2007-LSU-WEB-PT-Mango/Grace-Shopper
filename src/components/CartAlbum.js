import React, { useState } from 'react';
import {Grid, 
        Card, 
        CardMedia, 
        CardContent, 
        Typography, 
        Button, 
        MenuItem, 
        FormHelperText, 
        FormControl, 
        Select, 
        Fade} from '@material-ui/core';
import {removeItemCart, quantityUpdate} from '../api';



const CartAlbum = ({product, shoppingCart, setShoppingCart, update, setUpdate, classes, total, quantityTotal}) => {
    const [checked, setChecked] = useState(true);
    const [remove, setRemove] = useState(false);
    const [quantity, setQuantity] = useState(product.quantity);


    return (
        <div id={product.id} style={remove? {display: "none"} : {display: "block"}}>
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
                                <Grid
                                container
                                justify="space-between"
                                alignItems="center">

                                    <FormControl className={classes.formControl}>
                                        <Select 
                                            value={quantity}
                                            onChange={(event)=> {
                                                setQuantity(event.target.value)
                                            }}>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select>
                                        <FormHelperText>quantity</FormHelperText>
                                        <Button
                                            onClick={() => {
                                                quantityUpdate(shoppingCart.id, product.id, quantity)
                                                const updateIndex = shoppingCart.products.findIndex((updateProduct) => updateProduct.id === product.id );
                                                shoppingCart.products[updateIndex].quantity = quantity;
                                                setShoppingCart(shoppingCart);
                                                setUpdate(!update);
                                                total();
                                                quantityTotal();
                                            }}>
                                            update
                                        </Button>
                                    </FormControl>
                                    <Button variant="contained" disableRipple={true}
                                        onClick={async () => {
                                            try {
                                                removeItemCart(shoppingCart.id, product.id)
                                                setChecked(false);
                                                const updatedOrder = shoppingCart.products.filter((updatedProduct) => {
                                                    return updatedProduct.id !== product.id
                                                })
                                                shoppingCart.products = updatedOrder;
                                                setShoppingCart(shoppingCart);
                                                setUpdate(!update);
                                                setRemove(!remove);
                                            } catch (error) {
                                                throw error
                                            };
                                        }}>
                                        Remove
                                    </Button>
                                </Grid>
                        </Card>
                    </Fade>
                </div>
    )
}

export default CartAlbum;
            


