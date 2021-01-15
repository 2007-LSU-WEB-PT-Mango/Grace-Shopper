// POST  /users/register
// POST  /users/login
// GET   /users/me (*)

const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { getUserByUsername, createUser } = require('../db/index');
const jwtGenerator = require('../utils/jwtGenerator');

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
    const token = jwtGenerator(newUser.id);
    res.send({
      success: true,
      message: 'New user registered.',
      username,
      token,
    });
  } catch (error) {
    console.error(error);
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
