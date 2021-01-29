import React, { useState } from "react";
import { loginUser } from "../api/index";
import { Link } from "react-router-dom";
// Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Checkbox } from "@material-ui/core";
import { SentimentSatisfied } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    isGuest: false,
  });
  const { username, password, isGuest } = loginData;
  const classes = useStyles();
  const onChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
    console.log(loginData);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoginData({ username: "", password: "" });

      const data = await loginUser({ username, password });

      if (!data.success) {
        setErrorMessage(data.message);
        return;
      }
      if (data.success) {
        setSuccessMessage(data.message);
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response);
    }
  };

  const isGuestClick = (event) => {
    event.preventDefault();
    // const chicken = event.target.checked;
    if (isLoggedIn === false) {
      setLoginData({
        ...loginData,
        username: "guest",
      });
      setLoginData({
        ...loginData,
        password: "guest",
      });
      // setLoginData({
      //   ...loginData,
      //   isGuest: chicken,
      // });
      setLoginData({
        ...loginData,
        [event.target.name]: event.target.checked,
      });
      console.log(loginData);

      setSuccessMessage("You are logged in as Guest.");
      setIsLoggedIn(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorMessage ? <h5 style={{ color: "red" }}>{errorMessage}</h5> : null}
        {successMessage ? (
          <h5 style={{ color: "green" }}>{successMessage}</h5>
        ) : null}
        <form className={classes.form} noValidate onSubmit={submitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container className={classes.paper}>
            <Grid item className={classes.paper}>
              <Link to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
              <Checkbox
                onClick={isGuestClick}
                name="isGuest"
                label="Continue as Guest"
              ></Checkbox>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Auth;
