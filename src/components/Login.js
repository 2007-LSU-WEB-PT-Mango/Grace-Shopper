import React, { useState } from "react";

const Auth = (props) => {
  const { setIsLoggedIn } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form className="log-in" onSubmit={(event) => event.preventDefault()}>
      <h5 className="error">Error!</h5>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="username"
        className="login"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
        className="login"
      />
      <button
        className="register-button"
        onClick={async (event) => {
          event.preventDefault();
          try {
            const result = await FUNCTION(username, password, true);

            setIsLoggedIn(true);
            if (result.error) {
              setMessage(result.error);
              return <h3 className="error">Username Already Exists!</h3>;
            } else {
              setIsLoggedIn(true);
            }
            // console.log("result in registwer button", result);
          } catch (error) {
            console.error(error);
          }

          // we need the api function to go here in a try catch block ^^^^
        }}
      >
        Sign Up
      </button>
      <button
        className="log-in-button"
        onClick={async (event) => {
          event.preventDefault();
          try {
            const result = await FUNCTION(username, password);
            if (result.error) {
              setMessage(result.error);
              return <h3 className="error"> Incorrect email or password!</h3>;
            } else {
              setIsLoggedIn(true);
            }
          } catch (error) {
            console.error(error);
          }

          //we need the api route function to go here in the try catch block ^^^^
        }}
      >
        Log In
      </button>
    </form>
  );
};

export default Auth;
