import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

const local = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export async function getProducts() {
  try {
    const { data } = await local.get('/products');
    return data;
  } catch (err) {
    console.error(err);
  }
}
