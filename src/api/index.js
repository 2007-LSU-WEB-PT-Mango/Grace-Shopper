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
    console.log("this is data: ", data)
    localStorage.setItem('token', data.token);  
    localStorage.setItem('userID', data.userID);

    
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
    localStorage.setItem('userID', data.userID);
    
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

// how do I get userid into this???
export async function checkCart() {
  try {
    const token = localStorage.token;
    const ID = localStorage.userID;
    const { data } = await axios.get(`/api/orders/${ID}/cart`, {
      headers: { Authorization: `Bearer ${token}`},
    });
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function removeItemCart(orderID, productID) {
  try {
    const token = localStorage.token;
    const { data } = await axios.delete(`/api/order_products/${orderID}/${productID}`, {
      headers: { Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// not working yet
export async function quantityUpdate(orderID, productID, quantity) {
  try {
    const token = localStorage.token;
    const { data } = await axios.patch('/api/orderedproducts/updatequantity', {
      headers: { Authorization: `Bearer ${token}`},
      body: {"orderID": orderID, "productID": productID, "quantity": quantity}
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addToOrder(orderID, productID) {
  
  try {
    const token = localStorage.token;
    
    const response = await axios.post(`/api/orders/${orderID}/${productID}`, {
      headers: { Authorization: `Bearer ${token}`},
    });
    
    return response.data;
  } catch (error) { 
    throw error
  }
}