// This is the Web Server
const express = require('express');
const server = express();

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
const bodyParser = require('body-parser');
server.use(bodyParser.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', require('./routes'));
server.use('/api/users', require('./routes/users'));

const Stripe = require('stripe');

const stripe = Stripe('sk_test_51ICFMDCJh48L0M91i51uTAjgxFsbPE1XQrV0Q5n7TQD4dzEDqIps6iCAGljkvUsfBApmKPwTOnELE7TeCEX7vywt003rsJR1fS');

const YOUR_DOMAIN = 'http://localhost:3000';

server.post('/create-checkout-session', async (req, res) => {
  console.log("inside route for checkout!")
  const totalPrice = req.body.totalCart;
  console.log("body: ", req.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Mango Records',
            images: ['https://i.imgur.com/D82HQ9Y.png'],
          },
          unit_amount: totalPrice,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log("session:", session)
  res.json({ id: session.id });
});

server.listen(4242, () => console.log(`Listening on port ${4242}!`));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.log(err.status);
  res.status(err.status || 500).send({ message: err.message });
});

// bring in the DB connection
const { client } = require('./db');


// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

// const express = require('express');
// const app = express();

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys


// connect to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }
});