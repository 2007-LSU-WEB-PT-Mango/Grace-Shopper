import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Album from "./Album";
// Material UI imports
import { Grid, Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const AlbumsList = ({ productList, shoppingCart, setShoppingCart, isLoggedIn }) => {
  const { id } = useParams();
  let filteredAlbum = productList.find(
    (product) => id && Number(id) === Number(product.id)
  );
  return (
    <>
      <div id="AlbumList" style={{ width: "80vw", margin: "0 auto" }}>
        <Grid container>
          {filteredAlbum ? (
            <>
              <Grid container
                direction="row"
                alignItems="center">
                <Album
                  ID={filteredAlbum.id}
                  name={filteredAlbum.name}
                  description={filteredAlbum.description}
                  price={filteredAlbum.price}
                  imageURL={filteredAlbum.imageURL}
                  inStock={filteredAlbum.inStock}
                  category={filteredAlbum.category}
                  trackList={filteredAlbum.trackList}
                  shoppingCart={shoppingCart}
                  setShoppingCart={setShoppingCart}
                  isLoggedIn={isLoggedIn}
                  singleAlbum={true}
                />
              </Grid>
            </>
          ) : (
            productList.map((product, index) => {
              return (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <Album
                    ID={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    imageURL={product.imageURL}
                    inStock={product.inStock}
                    category={product.category}
                    shoppingCart={shoppingCart}
                    setShoppingCart={setShoppingCart}
                    isLoggedIn={isLoggedIn}
                    singleAlbum={false}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
        {filteredAlbum ? (
          <Link to="/products">
            <Button variant="contained" color="primary">
              <KeyboardBackspaceIcon />
              Return to All Products
            </Button>
          </Link>
        ) : null}
      </div>
    </>
  );
};
export default AlbumsList;
