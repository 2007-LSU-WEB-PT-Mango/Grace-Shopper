// code to build and initialize DB goes here
const {
  client,
  // other db methods
  getAllProducts,
  createProduct,
  getProduct,
} = require("./index");

async function dropTables() {
  console.log("dropping tables");
  try {
    client.query(`
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);
  } catch (error) {
    console.error("error dropping tables");

    throw error;
  }
}

async function buildTables() {
  console.log("building tables");
  try {
    
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" VARCHAR(255),
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        "imageURL" VARCHAR(500) DEFAULT "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/1920px-12in-Vinyl-LP-Record-Angle.jpg",
        "inStock" BOOLEAN DEFAULT false NOT NULL,
        category VARCHAR(255) NOT NULL
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'created',
        "userID" INTEGER REFERENCES users(id),
        "datePlaced" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("tables created!");
    await populateInitialData();
  } catch (error) {
    console.error("error creating tables");
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("creating products....");

    const productOne = await createProduct({
      name: "Revolver",
      description: "The Beatles",
      price: 19,
      imageURL:
        "https://images-na.ssl-images-amazon.com/images/I/91ffeWzPNpL._SL1500_.jpg",
      inStock: true,
      category: "rock",
    });

    const productTwo = await createProduct({
      name: "Abbey Road",
      description: "The Beatles",
      price: 20,
      imageURL:
        "https://images-na.ssl-images-amazon.com/images/I/81dUVKQDBEL._SL1200_.jpg",
      inStock: true,
      category: "rock",
    });

    const productThree = await createProduct({
      name: "test",
      description: "by unknown",
      price: 15,
      category: "unknown",
    });

    console.log("success creating products!");

    return [productOne, productTwo];
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await getAllProducts();
    await getProduct(2);
  } catch (error) {
    throw error;
  }
}
rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
