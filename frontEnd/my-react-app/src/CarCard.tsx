// CarCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css'; // Import the CSS file

interface CarCardProps {
  car: {
    plate_id: number;
    model: string;
    production_year: number;
    color: string;
    photo: string;
    category: string;
  };
}

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <div className="car-card">
    <img className="car-image" src={car.photo} alt={`${car.model} - ${car.color}`} />
    <div>
      <p className="card-title">{`${car.model} - ${car.color}`}</p>
      <p>{`Year: ${car.production_year}`}</p>
      <p>{`Category: ${car.category}`}</p>
      <Link to={`/showcar/${car.plate_id}`}>
        <button className="btn btn-primary">Reserve</button>
      </Link>
    </div>
  </div>
);

export default CarCard;
