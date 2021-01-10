import React, { useState, useEffect } from "react";
import "./styles.css";
import Products from "./Products";
import Header from "./Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AlbumsList } from "../components";

import { getSomething } from "../api";

const useStyles = makeStyles({});

const App = () => {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   getSomething()
  //     .then((response) => {
  //       setMessage(response.message);
  //     })
  //     .catch((error) => {
  //       setMessage(error.message);
  //     });
  // });
  const classes = useStyles();
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/products"
            render={(props) => <Products {...props} />}
          />
        </Switch>
      </BrowserRouter>
      <AlbumsList />

      {/* <h2>{message}</h2> */}
    </div>
  );
};

export default App;
