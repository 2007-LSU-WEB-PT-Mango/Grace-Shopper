import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AlbumsList, Login, Register, Dashboard } from '../components';
import { getProducts } from '../api';

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
          <Route exact path="/products/:id">
            <AlbumsList
              productList={productList}
              setProductList={setProductList}
            />
          </Route>
          <Route exact path="/products">
            <AlbumsList productList={productList} />
          </Route>
          <Route exact path="/register">
            <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/login">
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
