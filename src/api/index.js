import axios from 'axios';

const local = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export async function getSomething() {
  try {
    const { data } = await axios.get(
      // '/api/products'
      'https://mangorecordshop.herokuapp.com/api/products'
    );
    // const { data } = await local.get('/products');
    return data;
  } catch (error) {
    throw error;
  }
}

const heroku = axios.create({
  // baseURL: 'http://localhost:3000/api'
  baseURL: 'https://mangorecordshop.herokuapp.com/api',
});

export async function getProducts() {
  try {
    const { data } = await heroku.get('/products');
    return data;
  } catch (err) {
    throw err;
  }
}
