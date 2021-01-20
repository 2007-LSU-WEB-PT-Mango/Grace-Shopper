import React, { useState, useEffect } from 'react';
import { getUserData } from '../api/index';

const Dashboard = () => {
  useEffect(() => {
    getUserData()
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  });

  return (
    <>
      <h1>Dashboard user here.</h1>
    </>
  );
};

export default Dashboard;
