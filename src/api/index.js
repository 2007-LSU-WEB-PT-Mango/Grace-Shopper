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
  // console.log('inside registerNewUser');
  try {
    const { data } = await axios.post('/api/users/register', {
      firstName,
      lastName,
      username,
      email,
      password,
    });
    // console.log('regNewUser line 29');
    localStorage.setItem('token', data.token);

    // console.log('console.log inside registerNewUser:', data);
    return data;
  } catch (error) {
    console.error(error);
    // next(error);
    throw error;
  }
}

export async function loginUser({ username, password }) {
  try {
    const { data } = await axios.post('/api/users/login', {
      username,
      password,
    });

    localStorage.setItem('token', data.token);

    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserData() {
  try {
    const token = localStorage.token;
    const { data } = await axios.get('/api/users/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


