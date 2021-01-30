const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  
  //  Get the auth header value
  const bearerHeader = req.header("Authorization")
  
  try {
    //  Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // Split bearer token at the space
      const bearer = bearerHeader.split(' ');
      //   Get token from array
      const token = bearer[1];
      //   Set the token
      req.token = token;
      
      // Next middleware
      next();
    } else {
      res.status(403).json('Forbidden');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = verifyToken;
