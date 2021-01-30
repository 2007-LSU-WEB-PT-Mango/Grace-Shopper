// import React, { useState } from "react";
// import { Redirect } from "react-router-dom";

// const logoutButton = () => {
//   const [loggedOut, setLoggedOut] = useState(false);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userID");
//     setLoggedOut(true);
//   };

//   if (loggedOut) {
//     return <Redirect to="/login" push={true} />;
//   }

//   return <button onClick={logout}>Log out</button>;
// };
// export default logoutButton;
