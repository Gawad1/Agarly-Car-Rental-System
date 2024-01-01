// CarDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Car } from './types.tsx'; 

interface CarDetailsProps {
  plate_id: string;
}

const CarDetails: React.FC<CarDetailsProps> = ({ plate_id }) => {
  
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/showcar/${plate_id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details', error);
      }
    };

    fetchCarDetails();
  }, [plate_id]);

  return (
    <div>
      <h2>Car Details</h2>
      {car ? (
        <div>
          <img src={car.photo} alt={`${car.model} - ${car.color}`} />
          <p>{`${car.model} - ${car.color}`}</p>
          <p>{`Year: ${car.production_year}`}</p>
          <p>{`Category: ${car.category}`}</p>
          <p>{`Pickup Date: ${car.pickup_date}`}</p>
          <p>{`Return Date: ${car.return_date}`}</p>
          <button className="btn btn-primary">Reserve</button>
          {/* Add calendar with crossed dates */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CarDetails;
