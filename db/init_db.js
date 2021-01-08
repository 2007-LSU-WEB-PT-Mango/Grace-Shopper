// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function dropTables() {
  console.log('dropping tables');
  try {
    client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS orders;
    `);
  } catch (error) {
      console.error('error dropping tables')

      throw error;
  }
}



async function buildTables() {
  console.log('building tables');
  try {
    // need to get default image url
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
        "imageURL" VARCHAR(255),
        "inStock" BOOLEAN NOT NULL DEFAULT false,
        category VARCHAR(255) NOT NULL
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'created',
        "userID" INTEGER REFERENCES users(id),
        "datePlaced" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `)
    

  } catch (error) {
    console.error('error creating tables')
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect()
    await dropTables();
    await buildTables()
  } catch(error) {
    throw error;
  }
}
rebuildDB()
  .catch(console.error)
  .finally(() => client.end());

// async function populateInitialData() {
//   try {
//     // create useful starting data
//   } catch (error) {
//     throw error;
//   }
// }

// buildTables()
//   .then(populateInitialData)
//   .catch(console.error)
//   .finally(() => client.end());