import React, { useState, useEffect } from 'react';

<<<<<<< HEAD
import { AlbumsList } from '../components';

import { getSomething } from '../api';
=======
import {
  getSomething
} from '../api';
>>>>>>> database

const App = () => {
  const [message, setMessage] = useState('');

<<<<<<< HEAD
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
=======
  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
    </div>
  );
}

export default App;
>>>>>>> database
