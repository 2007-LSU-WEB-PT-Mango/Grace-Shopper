import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AlbumsList, Login, Register, Dashboard } from '../components';
import { getProducts } from '../api';
import Cart from '../components/Cart';

const useStyles = makeStyles({});

const App = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProductList(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const classes = useStyles();
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/products/:id">
            <AlbumsList
              productList={productList}
            />
          </Route>
          <Route exact path="/products">
            <AlbumsList productList={productList} />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <h1>This is the home page</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
