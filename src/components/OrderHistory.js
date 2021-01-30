import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 650,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '75%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

const imageStyle = {
  height: '50px',
  width: '50px',
  margin: '2px',
};

function SimpleDialog(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const { onClose, selectedValue, open, orderHistory } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Dialog
      maxWidth={'lg'}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Order History</DialogTitle>
      {orderHistory.length === 0 ? (
        'No orders on file. Please browse our selection.'
      ) : (
        <List>
          {orderHistory.map((order) => {
            const date = order.datePlaced.slice(0, 10);
            const [orderedProducts] = order.orderedProducts;
            const { quantity } = orderedProducts;

            return (
              <ListItem>
                <Accordion
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>
                      <b>Order ID:</b> <b>{order.id}</b>
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      <b>Date:</b> {date}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {/* Build a table with order details */}
                      <TableContainer component={Paper}>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <b>Album - Artist</b>
                              </TableCell>
                              <TableCell align="right">
                                <b>Quantity</b>
                              </TableCell>
                              <TableCell align="right">
                                <b>Price</b>
                              </TableCell>
                              <TableCell align="right">
                                <b>Order Status</b>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          {order.products.map((product) => {
                            return (
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  <img
                                    src={product.imageURL}
                                    style={imageStyle}
                                  />
                                  <b>
                                    {product.name} - {product.description}
                                  </b>
                                </TableCell>
                                <TableCell align="right">{quantity}</TableCell>
                                <TableCell align="right">
                                  ${product.price}
                                </TableCell>
                                <TableCell align="right">
                                  {order.status}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </Table>
                      </TableContainer>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            );
          })}
        </List>
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const OrderHistory = (props) => {
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const { orderHistory, setOrderHistory } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <div>
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Order History
      </Button>
      <SimpleDialog
        orderHistory={orderHistory}
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default OrderHistory;
