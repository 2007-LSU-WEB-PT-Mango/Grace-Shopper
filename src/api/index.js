import axios from "axios";

export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
    return data;
  } catch (error) {
    throw error;
  }
}

///^^^^idk what that top part is?? Do we need that?????

const apiRouter = require("express").Router();

apiRouter.get("/products", async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
    next();
  } catch (error) {
    console.log("Error requesting products");
    next(error);
  }
});

apiRouter.get("/products/:id", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const products = getProduct(productId);

    res.send({ products });
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
