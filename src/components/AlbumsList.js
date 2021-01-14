import React from 'react';
import {useParams} from 'react-router-dom';

// Material UI imports
import Grid from '@material-ui/core/Grid';

import Album from './Album';



const AlbumsList = ({ productList }) => {
  console.log(productList)
  const {id} = useParams();
  let filteredAlbum = productList.filter(function (product) {
    if (id) {
      return id == product.id;
    }
    return false
  })
  let selectedAlbum = filteredAlbum[0];
  
  return (
    <>
      <div id="AlbumList">
        <Grid container>
            {selectedAlbum?
              <>
                <Grid item xs={12} sm={6} lg={3}>
                  <Album
                    ID={selectedAlbum.id}
                    name={selectedAlbum.name}
                    description={selectedAlbum.description}
                    price={selectedAlbum.price}
                    imageURL={selectedAlbum.imageURL}
                    inStock={selectedAlbum.inStock}
                  />
                </Grid>
              </>
            :
            productList.map((product) => {
              return (
                <>
                  <Grid item xs={12} sm={6} lg={3}>
                    <Album
                      ID={product.id}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      imageURL={product.imageURL}
                      inStock={product.inStock}
                    />
                  </Grid>
                </>
              );
            })
        }
        </Grid>
      </div>
    </>
  );
};

export default AlbumsList;
