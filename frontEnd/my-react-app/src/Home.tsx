// Home.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Car {
  id: number;
  name: string;
  brand: string;
  // Add more properties as needed
}

const Home: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    // Replace 'API_ENDPOINT' with your actual backend API endpoint
    fetch('http://localhost:3001/home')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Link to="/login">Login</Link>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h1>Car Rental System</h1>
        {/* Add a search bar here */}
      </div>

      <div>
        {cars.map((car) => (
          <div key={car.id}>
            <h2>{car.name}</h2>
            <p>Brand: {car.brand}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
