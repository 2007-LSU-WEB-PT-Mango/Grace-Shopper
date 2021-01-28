import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const useStylesAccordion = makeStyles((theme) => ({
  root: {
    width: '100%',
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
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const classesA = useStylesAccordion();
  const [expanded, setExpanded] = useState(false);

  const { onClose, selectedValue, open, orderHistory, setOrderHistory } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Order History</DialogTitle>
      {/* Put a ternary here to display orderhistory or 'no orders' */}
      <List>
        {orderHistory.map((order) => {
          const date = order.datePlaced.slice(0, 10);
          return (
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classesA.heading}>
                  <b>Order ID:</b> {order.id}
                </Typography>
                <Typography className={classesA.secondaryHeading}>
                  <b>Date:</b> {date}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <b>Order Status:</b> {order.status}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </List>
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
