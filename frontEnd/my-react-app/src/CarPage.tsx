// src/CarPage.tsx
import React, { useState, useEffect } from 'react';

interface CarData {
  car_specs: {
    plate_id: number;
    model: string;
    production_year: number;
    color: string;
    photo: string;
    category: string;
    class_id: number;
    office_id: number;
    status: string;
  };
  reservations: {
    pickup_date: string;
    return_date: string;
  }[];
}

const CarPage: React.FC<{ plateId: string }> = ({ plateId }) => {
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/showcar/${plateId}`);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setCarData(data);
        } else {
          console.error('Error fetching car data:', await response.text());
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [plateId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carData) {
    return <div>Error loading car data</div>;
  }

  return (
    <div>
      <h2>Car Details</h2>
      <p>Plate ID: {carData.car_specs.plate_id}</p>
      <p>Model: {carData.car_specs.model}</p>
      {/* Add other car details here */}
      <h3>Reservations</h3>
      <ul>
        {carData.reservations.map((reservation, index) => (
          <li key={index}>
            Pickup Date: {reservation.pickup_date}, Return Date: {reservation.return_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarPage;
