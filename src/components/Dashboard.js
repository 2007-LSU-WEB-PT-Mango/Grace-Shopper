import React, { useState, useEffect } from 'react';
import { getUserData } from '../api/index';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    getUserData()
      .then((response) => {
        console.log(response);
        const { firstName, lastName, username, message } = response;
        setGreeting(message);
      })
      .catch((err) => console.error(err));
  });

  return (
    <>
      <h1>{greeting}</h1>
    </>
  );
};

export default Dashboard;
