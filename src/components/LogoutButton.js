import React from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const LogoutButton = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
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
