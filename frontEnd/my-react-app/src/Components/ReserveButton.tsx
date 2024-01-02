// ReserveButton.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface ReserveButtonProps {
  plate_id: number;
}

const ReserveButton: React.FC<ReserveButtonProps> = ({ plate_id }) => {
  const [ssn, setSSN] = useState('');
  const [pickup_date, setPickupDate] = useState('');
  const [return_date, setReturnDate] = useState('');
  const [price, setPrice] = useState('');

  const handleReservation = async () => {
    try {
      await axios.post('http://localhost:3001/reserve', {
        ssn,
        plate_id,
        pickup_date,
        return_date,
        price,
      });
      // Handle success (e.g., show a success message)
      console.log('Reservation successful');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error during reservation:', error);
    }
  };

  return (
    <div>
      <h3>Make a Reservation:</h3>
      <div>
        <label>
          SSN:
          <input type="text" value={ssn} onChange={(e) => setSSN(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Pickup Date:
          <input type="text" value={pickup_date} onChange={(e) => setPickupDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Return Date:
          <input type="text" value={return_date} onChange={(e) => setReturnDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
      </div>
      <button onClick={handleReservation}>Reserve</button>
    </div>
  );
};

export default ReserveButton;
