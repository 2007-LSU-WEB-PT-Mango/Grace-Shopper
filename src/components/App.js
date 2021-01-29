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
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState('');

  useEffect(() => {
    const start = async () => {
      try {
        const newProducts = await getProducts();
        setProductList(newProducts);
        const { token } = await getUserData();

        if (token === localStorage.token) {
          setIsLoggedIn(true);
        }
        const storageCart = await loadCart();
        setCart(storageCart);
      } catch (error) {
        throw error;
      }
    };
    start();
  }, []);

  const loadCart = async () => {
    try {
      const newCart = await checkCart();

      return newCart;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          cart={cart}
          setOrder={setOrder}
        />
        <Switch>
          <Route exact path="/success">
            <Success />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              setCart={setCart}
              order={order}
              setOrder={setOrder}
            />
          </Route>
          <Route exact path="/products/:id">
            <AlbumsList productList={productList} cart={cart} />
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
