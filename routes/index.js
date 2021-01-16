const apiRouter = require('express').Router();
const { getAllProducts, getProduct } = require('../db/index');

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/products', async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
  } catch (error) {
    console.log('Error requesting products');
    next(error);
  }
});

apiRouter.get('/products/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const products = await getProduct(id);

    res.send(products);
  } catch (error) {
    next(error);
  }
});

// apiRouter.post('/users/register', async (req, res, next) => {
//   try {
//     res.json('This route will register and create a new user.');
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = apiRouter;
