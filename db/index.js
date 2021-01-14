// Connect to DB
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

    console.log('the products are:', products);

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
    console.log('finding product id:', productID);
    const {
      rows: [product],
    } = await client.query(`
      SELECT *
      FROM products
      WHERE id=${productID}
    `);

    console.log('found the following:', product);
    return product;
  } catch (error) {
    throw error;
  }
}

// USER METHODS
async function checkUsername(username) {
  try {
    const user = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1
    `,
      [username]
    );

    return user.rows;
  } catch (error) {
    throw error;
  }
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

// export
module.exports = {
  client,
  // db methods
  getAllProducts,
  createProduct,
  getProduct,
  checkUsername,
  createUser,
};
