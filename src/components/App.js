import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AlbumsList } from "../components";
import { getSomething, getProducts } from "../api";

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
      <Router>
        <Header />
        <Switch>
          <Route exact path="/products">
            <AlbumsList productList={productList} />
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
