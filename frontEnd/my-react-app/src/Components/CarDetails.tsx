// CarDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CarDetails as CarDetailsType } from '../types';

interface CarDetailsProps {
  plate_id: string;
}

const CarDetails: React.FC<CarDetailsProps> = ({ plate_id }) => {
  const [car, setCar] = useState<CarDetailsType>({ car_specs: null, reservations: [] });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get<CarDetailsType>(`http://localhost:3001/showcar/${plate_id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details', error);
      }
    };

    fetchCarDetails();
  }, [plate_id]);

  const renderDateCalendar = () => {
    if (!car || !car.car_specs || !car.reservations) {
      return null;
    }

    return (
      <div>
        <h3>Reservations:</h3>
        <ul>
          {car.reservations.map((reservation, index) => (
            <li key={index}>
              {`Pickup Date: ${reservation.pickup_date}, Return Date: ${reservation.return_date}`}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h2>Car Details</h2>
      {car.car_specs ? (
        <div>
          <img src={car.car_specs.photo} alt={`${car.car_specs.model} - ${car.car_specs.color}`} />
          <p>{`${car.car_specs.model} - ${car.car_specs.color}`}</p>
          <p>{`Year: ${car.car_specs.production_year}`}</p>
          <p>{`Category: ${car.car_specs.category}`}</p>
          {renderDateCalendar()}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CarDetails;
