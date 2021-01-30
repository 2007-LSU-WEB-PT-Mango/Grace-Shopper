import React, { useState, useEffect } from "react";
import { getUserData, getUserOrders } from "../api/index";
import OrderHistory from "./OrderHistory";
// Material UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

// useStyles goes here
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  shell: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
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

const Dashboard = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [isGuest, setIsGuest] = useState("");

  const loadData = async () => {
    try {
      const response = await getUserData();
      const { id, firstName, lastName, username, email, isGuest } = response;
      setUsername(username);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setIsGuest(isGuest);
      const orders = await getUserOrders(id);
      setOrderHistory(orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        {isGuest == false ? (
          <Typography component="h1" variant="h5">
            Welcome, Guest!
          </Typography>
        ) : (
          <Typography component="h1" variant="h5">
            Welcome, {firstName}!
          </Typography>
        )}
      </div>
      <div style={{ margin: "1rem" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <b>Username</b>
                </TableCell>
                <TableCell align="left">{username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <b>Email Address</b>
                </TableCell>
                <TableCell align="left">{email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <b>Name</b>
                </TableCell>
                <TableCell align="left">
                  {firstName} {lastName}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <OrderHistory orderHistory={orderHistory} />
      </div>
    </Container>
  );
};

export default Dashboard;
