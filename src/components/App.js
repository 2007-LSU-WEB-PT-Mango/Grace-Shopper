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
import { getProducts, getUserData, checkCart } from '../api';
import Cart from '../components/Cart';
import Success from './Success';

const App = () => {
  const [productList, setProductList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);

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
        setShoppingCart(storageCart);
      } catch (error) {
        throw error;
      }
    };
    start();
  }, [isLoggedIn]);

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
        />
        <Switch>
          <Route exact path="/success">
            <Success 
              shoppingCart={shoppingCart}/>
          </Route>
          <Route exact path="/cart">
            <Cart
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          </Route>
          <Route exact path="/products/:id">
            <AlbumsList 
              productList={productList} 
              shoppingCart={shoppingCart} 
              setShoppingCart={setShoppingCart}
              isLoggedIn={isLoggedIn}/>
          </Route>
          <Route exact path="/products">
            <AlbumsList 
              productList={productList} 
              shoppingCart={shoppingCart} 
              setShoppingCart={setShoppingCart}
              isLoggedIn={isLoggedIn}/>
          </Route>
          <Route exact path="/register">
            {isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Register 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} />
            )}
          </Route>
          <Route exact path="/login">
            {isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} />
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
