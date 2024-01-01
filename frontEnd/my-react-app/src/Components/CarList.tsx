// CarList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarCard from './CarCard.tsx';
import { useUser } from './UserContext.tsx'; // Import the useUser hook
import '../Styling/CarList.css';
import '../Styling/HomeHeader.css';

interface Car {
  plate_id: number;
  model: string;
  production_year: number;
  color: string;
  photo: string;
  category: string;
}

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { user } = useUser(); // Use the useUser hook to get user information

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

  const handleSearch = (car: Car, term: string) => {
    return (
      Object.keys(car).some(
        (key) =>
          typeof car[key] === 'string' &&
          car[key].toLowerCase().includes(term.toLowerCase())
      ) ||
      (typeof car.production_year === 'number' &&
        car.production_year.toString().includes(term))
    );
  };

  const filteredCars = cars.filter((car) => handleSearch(car, searchTerm));

  return (
 // Inside the render method of CarList.tsx

<div>
  {/* Big Header with Animation */}
  <div className="home-header">
    <img className="header-image" src="/header.jpeg" alt="Header JPEG" />
    <h1 className="header-text">
      Welcome to Car Showcase, {user ? user.name : 'Guest'}
    </h1>
  </div>

  {/* Car List */}
  <div className="container mt-4">
    <div className="row">
      <div className="col text-center">
        <input
          type="text"
          className="form-control"
          placeholder="Advanced Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
    <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
      {filteredCars.map((car, index) => (
        <React.Fragment key={car.plate_id}>
          <div className="col mb-3">
            <Link to={`/showcar/${car.plate_id}`}>
              <CarCard car={car} />
            </Link>
          </div>
          {/* Add the following to create a new row after every 3 cards */}
          {(index + 1) % 3 === 0 && <div className="w-100"></div>}
        </React.Fragment>
      ))}
    </div>
  </div>
</div>


  );
};

export default CarList;
