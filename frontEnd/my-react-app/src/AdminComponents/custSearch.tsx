import React, { useState } from 'react';
import axios from 'axios';

const CustomerSearch: React.FC = () => {
  const [ssn, setSsn] = useState('');
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/customerSearch', { ssn });

      if (response.status === 200) {
        setCustomerData(response.data);
      } else {
        console.error('Error fetching customer data:', response.statusText);
      }
    } catch (error) {
      console.error('Error during customer data fetch:', error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <h2>Customer Search</h2>
      <form onSubmit={handleSearch}>
        <label>
          SSN:
          <input
            type="text"
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {loading && <div>Loading...</div>}

      {customerData.length > 0 && (
        <div>
          <h3>Customer Details:</h3>
          <p>SSN: {customerData[0].ssn}</p>
          <p>Name: {`${customerData[0].f_name} ${customerData[0].l_name}`}</p>
          <p>Email: {customerData[0].email}</p>
          <p>Birth Date: {new Date(customerData[0].b_d).toLocaleDateString()}</p>
          <p>Gender: {customerData[0].gender}</p>

          {customerData.some(reservation => reservation.res_id) && (
            <div>
              <h3>Reservations:</h3>
              <ul>
                {customerData.map((reservation, index) => (
                  reservation.res_id && (
                    <li key={index}>
                      Reservation ID: {reservation.res_id}, Pickup Date: {new Date(reservation.pickup_date).toLocaleDateString()}, Return Date: {new Date(reservation.return_date).toLocaleDateString()}, Plate ID: {reservation.plate_id}
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;