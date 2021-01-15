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
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
    `,
      [username]
    );

    delete user.password;

    return user;
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

    delete user.bcryptPassword;

    return user;
  } catch (error) {
    throw error;
  }
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
};
