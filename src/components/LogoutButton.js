import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const LogoutButton = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  console.log('LogOut', props);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" push={true} />;
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        logout();
      }}
    >
      LOG OUT
    </Button>
  );
};
export default LogoutButton;
