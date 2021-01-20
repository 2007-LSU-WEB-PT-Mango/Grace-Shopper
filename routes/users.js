// POST  /users/register
// POST  /users/login
// GET   /users/dashboard (*)

const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { getUserByUsername, createUser } = require('../db/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('../middleware/verifyToken');

usersRouter.post('/register', async (req, res, next) => {
  try {
    // 1. Destructure the red. body
    const { firstName, lastName, username, email, password } = req.body;
    // 2. Check if user exists
    const user = await getUserByUsername(username);

    if (user.length !== 0) {
      return res.status(401).send({
        success: false,
        message: 'Username already exists!',
      });
    } else if (password.length < 8) {
      return res.status(401).send({
        success: false,
        message: 'Password must contain at least 8 characters',
      });
    }

    // 3. Bcrypt the user password
    // 4. Create new user in the database
    let newUser = await createUser({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    // 5. Generate and return JWT token
    jwt.sign({ newUser }, process.env.jwtSecret, (err, token) => {
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
      return res.status(401).send('Email or password is incorrect.');
    }
    // 3. Check if incoming password matches password in the database
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).send('Email or password is incorrect.');
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
        console.log(authData);
        const {
          id,
          firstName,
          lastName,
          username,
          email,
        } = authData.newUser[0];
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
