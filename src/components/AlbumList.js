import React from 'react';

import Album from './Album';

const dummyData = [
  {
    title: 'An album',
    desscription: 'An artist',
  },
  {
    title: 'An album',
    desscription: 'An artist',
  },
  {
    title: 'An album',
    desscription: 'An artist',
  },
];

const AlbumList = () => {
  return (
    <>
      <Album />
    </>
  );
};

export default AlbumList;
