import React from 'react';
import { useParams } from 'react-router-dom';
import CarDetails from './CarDetails.tsx';

const CarDetailsWrapper: React.FC = () => {
  const { plate_id } = useParams<{ plate_id: string }>();

  // Check if plate_id is undefined and handle accordingly
  if (!plate_id) {
    return <p>Invalid URL</p>;
  }

  return (
    <div>
      <h1>Car Details Page</h1>
      <CarDetails plate_id={plate_id} />
    </div>
  );
};

export default CarDetailsWrapper;
