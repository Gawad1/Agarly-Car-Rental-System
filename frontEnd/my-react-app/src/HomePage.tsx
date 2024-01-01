// CarList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Car {
  plate_id: number;
  model: string;
  production_year: number;
  color: string;
  photo: string;
  category: string;
  class_id: number;
  office_id: number;
}

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/home');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data', error);
      }
    };

    fetchData();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search cars by model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredCars.map((car) => (
          <Link key={car.plate_id} to={`/car/${car.plate_id}`}>
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                margin: '10px',
                padding: '10px',
                width: '200px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <img
                src={car.photo}
                alt={`${car.model} - ${car.color}`}
                style={{ maxWidth: '100%' }}
              />
              <p>{`${car.model} - ${car.color}`}</p>
              <p>{`Year: ${car.production_year}`}</p>
              <p>{`Category: ${car.category}`}</p>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default CarList;
