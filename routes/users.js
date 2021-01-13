// POST  /users/register
// POST  /users/login
// GET   /users/me (*)

const usersRouter = require('express').Router();

usersRouter.post('/register', async (req, res, next) => {
  try {
    res.json({ message: 'This route will register and create a new user.' });
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
