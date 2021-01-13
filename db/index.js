// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'mango';
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client({
  connectionString: DB_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined,
});

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

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
      SELECT *
      FROM users
    `);

    console.log('the users are:', users);

    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userID) {
  try {
    console.log('finding user id:', userID);
    const {
      rows: [user],
    } = await client.query(`
      SELECT *
      FROM users
      WHERE id=${userID}
    `);

    delete user.password;

    console.log('found the following:', user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    console.log('finding user by username:', username);
    const { rows: [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE username=${username}
    `);

    delete user.password;
    console.log('found the following:', user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser({
  firstName,
  lastName,
  email,
  imageURL,
  username,
  password,
  isAdmin
}) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users("firstName", "lastName", email, "imageURL", username, password, "isAdmin")
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `,
      [firstName, lastName, email, imageURL, username, password, isAdmin]
    );

    delete user.password
    
    console.log('this is the new user:', user)
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
  createUser
};
