// CarDetails.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CarDetails as CarDetailsType } from './types';
import { useUser } from './UserContext.tsx';
import '../Styling/CarDetails.css'; // Import the CSS file

interface CarDetailsProps {
  plate_id: string;
}

const CarDetails: React.FC<CarDetailsProps> = ({ plate_id }) => {
  const [car, setCar] = useState<CarDetailsType>({ car_specs: null, reservations: [] });
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get<CarDetailsType>(`http://localhost:3001/showcar/${plate_id}`);
        setCar(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching car details', error);
      }
    };

    fetchCarDetails();
  }, [plate_id]);

  const calculateTotalPrice = (pickupDate: Date | null, returnDate: Date | null, rate: number): number => {
    if (!pickupDate || !returnDate) {
      return 0; // or handle the case when dates are null
    }

    const timeDiff = returnDate.getTime() - pickupDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff * rate;
  };

  const handleReserve = async () => {
    if (!pickupDate || !returnDate) {
      alert('Please select pickup and return dates');
      return;
    }

    const rate = car.car_specs?.rate || 0;
    const totalPrice = calculateTotalPrice(pickupDate, returnDate, rate);

    // API call to reserve the car
    try {
      const response = await axios.post('http://localhost:3001/reserve', {
        ssn: user?.ssn, // Replace with the user's SSN
        plate_id,
        pickup_date: pickupDate.toISOString(),
        return_date: returnDate.toISOString(),
        price: totalPrice,
      });

      console.log(response.data.message); // Log the response message

      // Redirect to home page on successful reservation
      if (response.data.message === 'Reservation added successfully') {
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Error reserving car', error);

      // Show error message if reservation fails
      alert('Error reserving car. Please try again.');
    }
  };

  const renderDateCalendar = () => {
    if (!car || !car.car_specs || !car.reservations) {
      return null;
    }

    return (
      <div className="reservation-section">
        <h3>Reservations:</h3>
        <ul>
          {car.reservations.map((reservation, index) => (
            <li key={index}>
              {`Pickup Date: ${reservation.pickup_date}, Return Date: ${reservation.return_date}`}
            </li>
          ))}
        </ul>
        <p>Car Rate: ${car.car_specs.rate}</p>
        <p>Total Price for Reservation: ${calculateTotalPrice(pickupDate!, returnDate!, car.car_specs.rate)}</p>
      </div>
    );
  };

  return (
    <div className="car-details-container animated fadeIn">
      <h2>Car Details</h2>
      {car.car_specs ? (
       <div className="car-info">
        <img
          src={car.car_specs.photo}
          alt={`${car.car_specs.model} - ${car.car_specs.color}`}
          className="car-image"
          style={{ width: '400px', height: '300px' }} // Adjust dimensions as needed
        />
          <p className="fadeInUp">{`${car.car_specs.model} - ${car.car_specs.color}`}</p>
          <p className="fadeInUp">{`Year: ${car.car_specs.production_year}`}</p>
          <p className="fadeInUp">{`Category: ${car.car_specs.category}`}</p>

          <h3>Reserve Car</h3>
          <div>
            <p>Select Pickup Date:</p>
            <input type="date" className="fadeIn" onChange={(e) => setPickupDate(new Date(e.target.value))} />
          </div>
          <div>
            <p>Select Return Date:</p>
            <input type="date" className="fadeIn" onChange={(e) => setReturnDate(new Date(e.target.value))} />
          </div>

          <button className="reserve-button pulse" onClick={handleReserve}>Reserve</button>

          {renderDateCalendar()}
        </div>
      ) : (
        <p className="fadeIn">Loading...</p>
      )}
    </div>
  );
};

export default CarDetails;
