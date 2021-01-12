import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AlbumsList } from "../components";
import { getProducts } from "../api";

const useStyles = makeStyles({});

const App = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        console.log("App.js useEffect:", response);
        setProductList(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const classes = useStyles();
  return (
    <div className="App">
<<<<<<< HEAD
      <Router>
        <Header />
        <Switch>
          <Route exact path="/products/:id">
            <AlbumsList productList={productList} setProductList={setProductList}/>
          </Route>
          <Route exact path="/products">
            <AlbumsList productList={productList}/>
          </Route>
          <Route exact path="/">
            <h1>This is the home page</h1>
          </Route>
        </Switch>
      </Router>
=======
      <h1>My App</h1>
      {/* <AlbumsList productList={productList} /> */}
      {/* <h2>{message}</h2> */}
>>>>>>> dev
    </div>
  );
};

export default App;
