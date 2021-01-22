const apiRouter = require("express").Router();
const {
  getAllProducts,
  getProduct,
  getOrderByID,
  getAllOrders,
} = require("../db/index");

apiRouter.get("/products", async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
  } catch (error) {
    console.log("Error requesting products");
    next(error);
  }
});

apiRouter.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const products = await getProduct(id);

    res.json(products);
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/ordertest/:id"),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const orders = await getOrderByID(id);
      res.send(orders);
    } catch (error) {
      next(error);
    }
  };
// apiRouter.post('/users/register', async (req, res, next) => {
//   try {
//     res.json('This route will register and create a new user.');
//   } catch (error) {
//     next(error);
//   }
// });

apiRouter.patch("/orders/:orderId", async (req, res, next) => {
  const { status, userId } = req.body;
  console.log("The req.body is", req.body);

  const update = {};

  if (status) {
    updateFields.status = status;
  }

  if (userId) {
    updateFields.userId = userId;
  }

  try {
    const order = await getOrderByID(userId);
    console.log("the original order is", order);

    console.log("The update fields are", update);

    if (order.id === orderId) {
      const updateOrder = await updateOrder(userId, update);
      res.send({ order: updateOrder });
    } else {
      next({
        message: "Error updating order",
      });
    }
  } catch (error) {
    throw error;
  }
});

apiRouter.delete("/orders/:orderId", async (req, res, next) => {
  try {
    const order = await cancelOrder(req.params.orderId); //unsure yet what function will be called!
    res.send(order);
  } catch (error) {
    throw error;
  }
});

// PATCH /order_products/:orderProductId (**)
//Update the quantity or price on the order product

apiRouter.patch("/orders_products/:orderProductId", async (req, res, next) => {
  const { quantity, price } = req.body;
  console.log("The req.body is", req.body);

  const update = {};

  if (quantity) {
    updateFields.status = quantity;
  }

  if (price) {
    updateFields.userId = price;
  }

  try {
    const orderProduct = await getOrderByID(quantity, price);
    console.log("the new quantity or price is", orderProduct);

    console.log("The updated quantity or price is", update);

    if (order.id === orderId) {
      const updateOrder = await updateOrder(orderProduct, update);
      res.send({ order: updateOrder });
    } else {
      next({
        message: "Error updating order",
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = apiRouter;
