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
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, price, "imageURL", "inStock", category)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
      [name, description, price, imageURL, inStock, category]
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
async function getCartByUser(user) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
      SELECT *
      FROM users
      WHERE id=${user}
    `);

    delete user.password;

    return cart;
  } catch (error) {
    throw error;
  }
}

async function createOrder({ status, userID }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO order(status, userID)
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
  console.log('this working');
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

async function getOrdersbyUser({ userid }) {
  console.log('Let me grab these orders using your ID...');
  try {
    const {
      rows: [orders],
    } = await client.query(`
      SELECT *
      FROM orders
      WHERE userid = ${userid}
    `);
    return [orders];
  } catch (error) {
    throw error;
  }
}

// Week 3 - orderProduct
async function getOrderProductById(id) {
  try {
    const {
      rows: [orderProducts],
    } = await client.query(`
      SELECT * FROM orderedproducts
      WHERE id = ${id}
    `);
    return [orderProducts];
  } catch (error) {
    throw error;
  }
}

// // addProductToOrder
// if the product Id is NOT on the order yet, create a new order_products

async function addProductToOrder({ orderId, productId, price, quantity }) {
  try {
    const {
      rows: [addedProduct],
    } = await client.query(
      `
    INSERT INTO orderedproducts("orderId", "productId", price, quantity)
    VALUES ($1, $2, $3, $4)
    `,
      [orderId, productId, price, quantity]
    );

    return addedProduct;
  } catch (error) {
    throw error;
  }
}

async function updateOrderProduct({ id, price, quantity }) {
  try {
    const {
      rows: [updatedProduct],
    } = await client.query(
      `
    UPDATE orderedproducts
    SET price=$2, quantity=$3
    WHERE "orderId"=$1
    `,
      [id, price, quantity]
    );

    return updatedProduct;
  } catch (error) {
    throw error;
  }
}
// UPDATE orderedproducts
// SET price=$2, quantity=$3
// WHERE id=$1

async function destroyOrderProduct(id) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(`
    DELETE from orderedproducts
    WHERE id = ${id}
    `);

    return [orderProduct];
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
  } catch (error) {}
  throw error;
}

async function completeOrder({ id }) {
  try {
    const {
      rows: [order],
    } = await client.query(`
      UPDATE order SET status = status * 'complete'
      WHERE id = ${id}
      RETURNING name, order AS updated_order;
    `);
    return [order];
  } catch (error) {}
  throw error;
}

async function cancelOrder(id) {
  try {
    const {
      rows: [order],
    } = await client.query(`
      UPDATE order SET status = status * 'cancelled'
      WHERE id = ${id}
      RETURNING name, order AS updated_order;
    `);
    return [order];
  } catch (error) {}
  throw error;
}

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
  getOrderByID,
  getAllOrders,
  getOrdersbyUser,
  getCartByUser,
  createOrder,

};
