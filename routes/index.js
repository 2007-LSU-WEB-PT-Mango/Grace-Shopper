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
  getCartByUser,
  getOrdersAndProducts,
} = require('../db/index');
const verifyToken = require('../middleware/verifyToken');
const postVerifyToken = require('../middleware/postVerifyToken');

// get all products
apiRouter.get('/products', async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
  } catch (error) {
    console.log('Error requesting products');
    next(error);
  }
});

// get product by id
apiRouter.get('/products/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const products = await getOrderByProductId(id);

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// get all orders by userID
apiRouter.get('/orders/:userID', verifyToken, async (req, res, next) => {
  const { userID } = req.params;

  try {
    const orders = await getOrdersbyUser(userID);
    console.log('Line 51', orders);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/orders/:userID/cart', verifyToken, async (req, res, next) => {
  const { userID } = req.params;

  try {
    const orders = await getCartByUser(userID);

    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// changes order status to completed
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

// changes order status to cancelled
apiRouter.delete('/orders/:orderId', verifyToken, async (req, res, next) => {
  try {
    const order = await cancelOrder(req.params.orderId); //unsure yet what function will be called!
    res.send(order);
  } catch (error) {
    throw error;
  }
});

// updating quantity in order/cart
apiRouter.patch(
  '/orderedproducts/updatequantity',
  verifyToken,
  async (req, res, next) => {
    const { orderID, productID, quantity } = req.body;
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

// add product to order
apiRouter.post(
  '/orders/:orderId/:productId',
  postVerifyToken,
  async (req, res, next) => {
    const { orderId, productId } = req.params;

    try {
      const newProduct = await addProductToOrder(orderId, productId);

      res.send(newProduct);
    } catch (error) {
      throw error;
    }
  }
);

// delete product from order
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
