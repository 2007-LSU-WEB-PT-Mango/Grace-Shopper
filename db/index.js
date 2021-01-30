// Connect to DB
const { Compare, FormatAlignJustifyTwoTone } = require('@material-ui/icons');
const { Client } = require('pg');
const DB_NAME = 'mango';
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client({
  connectionString: DB_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined,
});

const bcrypt = require('bcrypt');
// const { delete } = require('../routes');

// database methods

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
      SELECT *
      FROM products
    `);

    return products;
  } catch (error) {
    throw error;
  }
}

async function createProduct({
  name,
  description,
  price,
  imageURL,
  inStock,
  category,
  trackList
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, price, "imageURL", "inStock", category, "trackList")
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `,
      [name, description, price, imageURL, inStock, category, trackList]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getProduct(productID) {
  try {
    const {
      rows: [product],
    } = await client.query(`
      SELECT *
      FROM products
      WHERE id=${productID}
    `);

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
      SELECT *
      FROM users
    `);

    users.map((user) => delete user.password);

    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userID) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT *
      FROM users
      WHERE id=${userID}
    `);

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const user = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
    `,
      [username]
    );

    delete user.password;

    return user.rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const userInfo = await client.query(
      `
      SELECT *
      FROM users
      WHERE email=$1
    `,
      [email]
    );

    delete userInfo.password;

    return userInfo.rows;
  } catch (error) {
    throw error;
  }
}

// still working on!!
async function authenticate({ username, password }) {
  let authQuery = `
    SELECT *
    FROM users
    WHERE username=$1
  `;

  const user = (await client.query(authQuery, [username])).rows[0];

  await Compare({ plain: password, hashed: user.password });

  return FormatAlignJustifyTwoTone.encode({ id: user.id }, process.env.JWT);
}

async function createUser({ firstName, lastName, email, username, password }) {
  try {
    // Password hashing
    const saltRound = 10; //encryption setting
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const { rows: user } = await client.query(
      `
    INSERT INTO users ("firstName", "lastName", email, username, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [firstName, lastName, email, username, bcryptPassword]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

//getcartbyuser, createorder;
async function getCartByUser(userID) {
  try {
    const { rows: shoppingCart } = await client.query(
      `
      SELECT *
      FROM orders
      WHERE "userID"=$1 AND status=$2
    `,
      [userID, 'cart']
    );
    if (shoppingCart) {
      const cart = shoppingCart[0];

      const orderProductsNumbers = await getCartProducts(cart.id);

      const orderProducts = await Promise.all(
        orderProductsNumbers.map((product) => {
          const cartProduct = getProduct(product.productID);
          return cartProduct;
        })
      );

      orderProducts.map((orderedProduct) => {
        const orderedProductsID = orderedProduct.id;
        orderProductsNumbers.map((product) => {
          if (orderedProductsID === product.productID) {
            orderedProduct.quantity = product.quantity;
          }
        });
      });
      cart.products = orderProducts;

      return cart;
    }
  } catch (error) {
    console.log('making a new cart!');
    const cart = createOrder('cart', userID);
    if (cart) {
      return cart;
    }
  }
}

async function createOrder(status, userID) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders(status, "userID")
      VALUES($1, $2)
      RETURNING *;
    `,
      [status, userID]
    );

    return order;
  } catch (error) {
    throw error;
  }
}
async function getOrderByID({ id }) {
  try {
    const {
      rows: [orders],
    } = await client.query(`
      SELECT id
      FROM orders
      WHERE id = ${id}
    `);

    return orders, [products.id];
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const {
      rows: [orders],
    } = await client.query(`
    SELECT *
    FROM orders
  `);

    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrdersbyUser(userID) {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT *
      FROM orders
      WHERE "userID" = $1
    `,
      [userID]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

// Week 3 - orderProduct
async function getCartProducts(orderID) {
  try {
    const { rows: orderProducts } = await client.query(`
      SELECT * FROM orderedproducts
      WHERE "orderID" = ${orderID}
    `);
    return orderProducts;
  } catch (error) {
    throw error;
  }
}

// // addProductToOrder
// if the product Id is NOT on the order yet, create a new order_products

async function addProductToOrder(orderID, productID, quantity = 1) {
  try {
    const { rows: addedProduct } = await client.query(
      `
    INSERT INTO orderedproducts("orderID", "productID", quantity)
    VALUES ($1, $2, $3)
    `,
      [orderID, productID, quantity]
    );

    return addedProduct;
  } catch (error) {
    throw error;
  }
}

async function updateOrderProduct(orderID, productID, quantity) {
  try {
    const { rows: updatedProduct } = await client.query(
      `
    UPDATE orderedproducts
    SET quantity=$3
    WHERE "orderID"=$1 AND "productID" =$2
    `,
      [orderID, productID, quantity]
    );

    return updatedProduct;
  } catch (error) {
    throw error;
  }
}
// UPDATE orderedproducts
// SET price=$2, quantity=$3
// WHERE id=$1

async function destroyOrderProduct(orderID, productID) {
  try {
    const { rows: order } = await client.query(
      `
    DELETE from orderedproducts
    WHERE "orderID" = $1 AND "productID" = $2
    `,
      [orderID, productID]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

// week 3 Adapters: updateOrder({id, status, userId}), completeOrder({id}), cancelOrder(id)

async function updateOrder({ id, status, userid }) {
  try {
    const {
      rows: [order],
    } = await client.query(`
      UPDATE order SET status = '' *
      WHERE id = ${id} , status = ${status} , userid = ${userid}
      RETURNING name, order AS updated_order;

    `);
    return [order];
  } catch (error) {
    throw error;
  }
}

async function completeOrder(id) {
  try {
    const { rows: order } = await client.query(`
      UPDATE orders SET status = 'complete'
      WHERE id = ${id}
      RETURNING *
    `);
    return order;
  } catch (error) {
    throw error;
  }
}

async function cancelOrder(id) {
  try {
    const {
      rows: [order],
    } = await client.query(`
      UPDATE orders SET status = 'cancelled'
      WHERE id = ${id}
      RETURNING *
    `);
    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrdersAndProducts(userID) {
  try {
    const orders = await getOrdersbyUser(userID);

    await Promise.all(
      orders.map(async (order) => {
        // for each order, run getOrderProducts(order.id)
        const products = await getCartProducts(order.id);
        console.log('DB products:', products);
        if (products) {
          await Promise.all(
            products.map(async (product) => {
              order.description = await getProduct(product.productID);
            })
          );
          // order.productInfo = await getProduct(order.products.id);
        }
      })
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrderHistory(userID) {
  try {
    // Get the user's orders.
    const orders = await getOrdersbyUser(userID);

    // Map over the orders to get their orderedproducts (getCartProducts(order.id))
    await Promise.all(
      orders.map(async (order) => {
        const orderedProducts = await getCartProducts(order.id);
        // orderedproducts && map over them to get their product description (getProduct)
        if (orderedProducts) {
          order.orderedProducts = orderedProducts;
          order.products = [];
          await Promise.all(
            orderedProducts.map(async (orderedProduct) => {
              const product = await getProduct(orderedProduct.productID);
              if (product) {
                order.products.push(product);
              }
            })
          );
        }
      })
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

// AND
// INNER JOIN orders
// ON users.id = orders."userID"
// INNER JOIN orderedproducts
// ON orders.id = orderedproducts."orderID";

// export
module.exports = {
  client,
  // db methods
  getAllProducts,
  createProduct,
  getProduct,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  authenticate,
  getUserByEmail,
  getOrderByID,
  getAllOrders,
  getOrdersbyUser,
  getCartByUser,
  createOrder,
  cancelOrder,
  addProductToOrder,
  destroyOrderProduct,
  updateOrderProduct,
  completeOrder,
  getOrdersAndProducts,
  getCartProducts,
  //
  getOrderHistory,
};
