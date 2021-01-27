import React from 'react';
import {useParams} from 'react-router-dom';
import { Link } from "react-router-dom";
// Material UI imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Album from './Album';



const AlbumsList = ({ productList }) => {

  const {id} = useParams();
  let filteredAlbum = productList.find(product => id && id == product.id);
  
  return (
    <>
      <div id="AlbumList">
        
      
        <Grid container>
            {filteredAlbum?
              <>
                <Grid item xs={12} sm={6} lg={3}>
                  <Album
                    ID={filteredAlbum.id}
                    name={filteredAlbum.name}
                    description={filteredAlbum.description}
                    price={filteredAlbum.price}
                    imageURL={filteredAlbum.imageURL}
                    inStock={filteredAlbum.inStock}
                  />
                </Grid>
              </>
            :
            productList.map((product, index) => {
              console.log(product)
              return (
                
                  <Grid item xs={12} sm={6} lg={3} key={index}>
                    <Album
                      ID={product.id}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      imageURL={product.imageURL}
                      inStock={product.inStock}
                    />
                  </Grid>
                
              );
            })
        }
        </Grid>
        {filteredAlbum?
        <Link to="/products">
          <Button variant="contained" color="primary">
            <KeyboardBackspaceIcon />
            Return to All Products
          </Button>
        </Link>
        :
          null
      }
      </div>
    </>
  );
};

export default AlbumsList;
