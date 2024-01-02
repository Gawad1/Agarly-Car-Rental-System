// CarList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CarCard from './CarCard.tsx';
import '../Styling/CarList.css';
import '../Styling/HomeHeader.css';

interface Car {
  plate_id: number;
  model: string;
  production_year: number;
  color: string;
  photo: string;
  category: string;
  rate: number;
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
  <div>
    {/* Big Header with Animation */}
    <div className="home-header">
      <img className="header-image" src="/header.jpeg" alt="Header JPEG" />
      <h1 className="header-text"></h1>
    </div>

    {/* Search bar below header */}
    <div className="row mt-3">
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

    {/* Add explicit space between search bar and cards */}
    <div className="mb-4"></div>
      <p>
       

'





        '
        


    </p>
    <p>
        

        '
        
        
        
        
        
        '
        


    </p>
    {/* Car List */}
    <div className="container">
      <div className="row">
        {filteredCars.map((car) => (
          <div key={car.plate_id} className="col-md-4">
            <Link to={`/showcar/${car.plate_id}`}>
              <CarCard car={car} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};


export default CarList;