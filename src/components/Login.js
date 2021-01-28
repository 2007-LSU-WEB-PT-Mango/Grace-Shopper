import React, { useState } from 'react';
import { loginUser } from '../api/index';
import { Link } from 'react-router-dom';
// Material UI
import {Avatar, Button, CssBaseline, TextField, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth = (props) => {
  const { setIsLoggedIn } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = loginData;
  const classes = useStyles();
  const onChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoginData({ username: '', password: '' });

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
        {errorMessage ? <h5 style={{ color: 'red' }}>{errorMessage}</h5> : null}
        {successMessage ? (
          <h5 style={{ color: 'green' }}>{successMessage}</h5>
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
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Auth;
