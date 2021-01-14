// POST  /users/register
// POST  /users/login
// GET   /users/me (*)

const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { checkUsername, createUser } = require('../db/index');

usersRouter.post('/register', async (req, res, next) => {
  try {
    //   1. De-structure the req.body (firstName, lastName, email, username, password).
    const { firstName, lastName, email, username, password } = req.body;

    //   2. Check if username exists.
    const user = await checkUsername(username);

    if (user.length !== 0) {
      return res.send({
        Warning: 'Username already exists!',
      });
    }

    //   3. Bcrypt the user's password
    //   4. Enter new user in db.
    const newUser = await createUser({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    //   5. Generate a JWT.

    console.log(newUser);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  try {
    res.send({ message: 'This route will log in a user.' });
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/me', async (req, res) => {
  try {
    res.send({
      message: `Send back the logged-in user's data if a valid token is supplied in the header.`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
