import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from './Header';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { AlbumsList, Login, Register, Dashboard } from '../components';
import { getProducts, getUserData } from '../api';
import Cart from '../components/Cart';
import Success from './Success';

const App = () => {
  const [productList, setProductList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadData = async () => {
    try {
      const response = await getProducts();

      const { token } = await getUserData();

      if (token === localStorage.token) {
        setIsLoggedIn(true);
      }
      setProductList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // useEffect(() => {
  //   getProducts()
  //     .then((response) => {
  //       setProductList(response);
  //       // if (localStorage.token) {
  //       //   setIsLoggedIn(true);
  //       // }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

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
            <AlbumsList productList={productList} />
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
