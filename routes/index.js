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
    next();
  } catch (error) {
    console.log('Error requesting products');
    next(error);
  }
});

apiRouter.get('/products/:id', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const products = getProduct(productId);

    res.send({ products });
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
