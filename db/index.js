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
  getUserByEmail,
  getOrderByID,
  getAllOrders,
  getOrdersbyUser,
  getCartByUser,
  createOrder,
};
