import React, { useState, useEffect } from 'react';

import { AlbumsList } from '../components';

import { getSomething, getProducts } from '../api';

const App = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        console.log('App.js useEffect:', response);
        setProductList(response);
      })
      .catch((error) => {
        // setMessage(error.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>My App</h1>
      {/* <AlbumsList productList={productList} /> */}
      {/* <h2>{message}</h2> */}
    </div>
  );
};

export default App;
