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
import { getProducts, checkCart } from '../api';
import Cart from '../components/Cart';
import Success from './Success';



const App = () => {
  const [productList, setProductList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    getProducts()
      .then((response) => {
        setProductList(response);
        if (localStorage.token) {
          setIsLoggedIn(true);
        };
        checkCart()
          .then((response) => {
            setCart(response)
          })
      }).catch((error) => console.error)
  }, [localStorage.userID]);
  

  
  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route exact path="/success">
            <Success />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} />
          </Route>
          <Route exact path="/products/:id">
            <AlbumsList
              productList={productList}
            />
          </Route>
          <Route exact path="/products">
            <AlbumsList productList={productList} cart={cart} />
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
