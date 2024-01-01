// CarDetailsWrapper.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import CarDetails from './CarDetails.tsx';

const CarDetailsWrapper: React.FC = () => {
  const { plate_id } = useParams<{ plate_id: string }>();

  // Check if plate_id is undefined and handle accordingly
  if (!plate_id) {
    return <p>Invalid URL</p>;
  }

  return <CarDetails plate_id={plate_id} />;
};

export default CarDetailsWrapper;
