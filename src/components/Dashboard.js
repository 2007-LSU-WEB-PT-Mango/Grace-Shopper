import React, { useState, useEffect } from 'react';
import { getUserData, getUserOrders } from '../api/index';
// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// useStyles goes here
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

const Dashboard = () => {
  const classes = useStyles();
  const [greeting, setGreeting] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const loadData = async () => {
    try {
      const response = await getUserData();
      console.log(`getUserData:`, response);
      const { id, firstName, lastName, username, email } = response;
      setUsername(username);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      const orders = await getUserOrders(id);
      console.log(`getUserOrders:`, orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome {username}!
          </Typography>
          <Typography component="h5" variant="h5">
            {firstName}
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
