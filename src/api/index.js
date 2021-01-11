import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

const heroku = axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: 'https://mango-record-shop.herokuapp.com/api',
});

export async function getProducts() {
  try {
    const { data } = await heroku.get('/products');
    return data;
  } catch (err) {
    console.error(err);
  }
}
