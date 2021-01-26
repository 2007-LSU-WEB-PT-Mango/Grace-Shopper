const apiRouter = require('express').Router();
const { default: axios } = require('axios');
const {
  getAllProducts,
  getProduct,
  getOrderByID,
  getAllOrders,
  createOrder,
  cancelOrder,
  getOrdersbyUser,
  addProductToOrder,
  destroyOrderProduct,
  updateOrderProduct,
  completeOrder,
} = require('../db/index');
const verifyToken = require('../middleware/verifyToken');

// Route:   GET /api/products
// Descr:   Retrieves product list
// Private: false
apiRouter.get('/products', async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
  } catch (error) {
    console.log('Error requesting products');
    next(error);
  }
});

// Route:   GET /api/products/:id
// Descr:   Retrieve info for a single product
// Private: false
apiRouter.get('/products/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const products = await getOrderByProductId(id);

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Route:   GET api/orders/:userID
// Descr:   Retrieve a user's order history
// Private: true
apiRouter.get('/orders/:userID', verifyToken, async (req, res, next) => {
  const { userID } = req.params;

  try {
    const orders = await getOrdersbyUser(userID);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// Route:   PATCH api/orders/complete/:orderId
// Descr:   Update a user's order status to complete
// Private: true
apiRouter.patch(
  '/orders/complete/:orderId',
  verifyToken,
  async (req, res, next) => {
    try {
      const order = await completeOrder(req.params.orderId); //unsure yet what function will be called!
      res.send(order);
    } catch (error) {
      throw error;
    }
  }
);

// Route:   PATCH api/orders/complete/:orderId
// Descr:   "Deletes" (status = cancelled) a user's order
// Private: true
apiRouter.delete('/orders/:orderId', verifyToken, async (req, res, next) => {
  try {
    const order = await cancelOrder(req.params.orderId); //unsure yet what function will be called!
    res.send(order);
  } catch (error) {
    throw error;
  }
});

// Route:   PATCH api/orderedproducts/updatequantity
// Descr:   Updates quantity of a product on an order
// Private: true
// updating quantity in order/cart
apiRouter.patch(
  '/orderedproducts/updatequantity',
  verifyToken,
  async (req, res, next) => {
    const { orderID, productID, quantity } = req.body;
    console.log('The req.body is', req.body);

    try {
      const orderProduct = await updateOrderProduct(
        orderID,
        productID,
        quantity
      );
      res.send(orderProduct);
    } catch (error) {
      throw error;
    }
  }
);

// Route:   POST /api/orders/:orderId/:productId
// Descr:   Adds a product to an order
// Private: true
apiRouter.post(
  '/orders/:orderId/:productId',
  verifyToken,
  async (req, res, next) => {
    const { orderId, productId } = req.params;
    try {
      const newProduct = await addProductToOrder(orderId, productId);
      console.log('newProduct:', newProduct);
      res.send({ success: 'true' });
    } catch (error) {
      next(error);
    }
  }
);

// Route:   DELETE api/order_products/:orderId/:productId
// Descr:   Removes a product from an order
// Private: true
apiRouter.delete(
  '/order_products/:orderID/:productID',
  verifyToken,
  async (req, res, next) => {
    const { orderID, productID } = req.params;
    try {
      const order = await destroyOrderProduct(orderID, productID);
      res.send(order);
    } catch (error) {
      throw error;
    }
  }
);

module.exports = apiRouter;
