// POST  /users/register
// POST  /users/login
// GET   /users/dashboard (*)

const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const {
  getUserByUsername,
  getUserByEmail,
  createUser,
} = require('../db/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('../middleware/verifyToken');

usersRouter.post('/register', async (req, res, next) => {
  try {
    // 1. Destructure the req. body
    const { firstName, lastName, username, email, password } = req.body;
    // 2. Check if user exists
    const userDB = await getUserByUsername(username);
    const userEmail = await getUserByEmail(email);

    if (userEmail.length !== 0) {
      res.send({
        success: false,
        message: 'An account for this e-mail already exists!',
      });
    }
    if (userDB.length !== 0) {
      res.send({
        success: false,
        message: 'Username already exists!',
      });
    }
    if (password.length < 8) {
      res.send({
        success: false,
        message: 'Password must contain at least 8 characters',
      });
    }
    // If any of the register fields are missings, generate an error w/ message.
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      username.length === 0 ||
      email.length === 0
    ) {
      res.send({
        success: false,
        message: 'Required fields missing!',
      });
    }

    // 3. Bcrypt the user password
    // 4. Create new user in the database
    let user = await createUser({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    // 5. Generate and return JWT token
    jwt.sign({ user }, process.env.jwtSecret, (err, token) => {
      res.send({
        success: true,
        message: 'New user registered.',
        username,
        token,
      });
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  try {
    // 1. Destructure the req.body
    const { username, password } = req.body;
    // 2. Check if user exists
    const user = await getUserByUsername(username);
    if (user.length === 0) {
      res.json('Email or password is incorrect.');
    }
    // 3. Check if incoming password matches password in the database
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      res.json({ success: false, message: 'Email or password is incorrect.' });
    }
    // 4. Generate a JWT token
    jwt.sign({ user }, process.env.jwtSecret, (err, token) => {
      res.send({
        success: true,
        message: `You are logged in as ${username}.`,
        token,
      });
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/dashboard', verifyToken, async (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.jwtSecret, (err, authData) => {
      if (err) {
        console.error(err);
        res.status(403).send('403 Error');
      } else {
        const { id, firstName, lastName, username, email } = authData.user[0];
        res.json({
          success: true,
          message: `Welcome ${username}!`,
          id,
          firstName,
          lastName,
          username,
          email,
        });
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
