import axios from 'axios';

export async function getProducts() {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (error) {
    throw error;
  }
}

// Build an axios request to register a new user
export async function registerNewUser({
  firstName,
  lastName,
  username,
  email,
  password,
}) {
  try {
    const { data } = await axios.post('/api/users/register', {
      firstName,
      lastName,
      username,
      email,
      password,
    });
    console.log('console.log inside registerNewUser:', data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
