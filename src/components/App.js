import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from './Header';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AlbumsList, Login, Register, Dashboard } from '../components';
import { getProducts } from '../api';
import Cart from '../components/Cart';
import Success from './Success';

const useStyles = makeStyles({});

const App = () => {
  const [productList, setProductList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route exact path="/success">
            <Success />
          </Route>
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
            {isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Route>
          <Route exact path="/login">
            {isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Route>
          <Route exact path="/dashboard">
            {!isLoggedIn ? <Redirect to="/login" /> : <Dashboard />}
          </Route>
          <Route path="/">
            <Redirect to="/products" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
