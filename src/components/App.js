import React, { useState, useEffect } from 'react';

import { AlbumsList } from '../components';

import { getSomething } from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   getSomething()
  //     .then((response) => {
  //       setMessage(response.message);
  //     })
  //     .catch((error) => {
  //       setMessage(error.message);
  //     });
  // });

  return (
    <div className="App">
      <AlbumsList />
      {/* <h2>{message}</h2> */}
    </div>
  );
};

export default App;
