// src/ReservationsReport.tsx
import React, { useState } from 'react';

interface Reservation {
  res_id: number;
  ssn: number;
  plate_id: number;
  res_date: string;
  pickup_date: string;
  return_date: string;
  price: number;
  model: string;
  production_year: number;
  color: string;
  photo: string;
  category: string;
  class_id: string;
  office_id: number;
  status: string;
  f_name: string;
  l_name: string;
  b_d: string;
  gender: string;
  email: string;
  pass: string;
}

const ReservationsReport: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('ReservationsCarCustomer'); // Default report type
  const [reservationData, setReservationData] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3001/resPerCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportType, startDate, endDate }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Reservations Report:', data);

        // Assuming the received data is an array of reservations
        setReservationData(data);
      } else {
        console.error('Error fetching reservations report:', await response.text());
      }
    } catch (error) {
      console.error('Error during reservations report fetch:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reservations Report</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating Report...' : 'Generate Report'}
        </button>
      </form>

      {reservationData.length > 0 && (
        <div>
          <h3>Report Data</h3>
          <table>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>SSN</th>
                <th>Plate ID</th>
                <th>Reservation Date</th>
                <th>Pickup Date</th>
                <th>Return Date</th>
                <th>Price</th>
                <th>Model</th>
                <th>Production Year</th>
                <th>Color</th>
                <th>Category</th>
                <th>Class ID</th>
                <th>Office ID</th>
                <th>Status</th>
                <th>First Name</th>
                <th>Last Name</th>
                {/* Add more headers based on your data structure */}
              </tr>
            </thead>
            <tbody>
              {reservationData.map((reservation) => (
                <tr key={reservation.res_id}>
                  <td>{reservation.res_id}</td>
                  <td>{reservation.ssn}</td>
                  <td>{reservation.plate_id}</td>
                  <td>{reservation.res_date}</td>
                  <td>{reservation.pickup_date}</td>
                  <td>{reservation.return_date}</td>
                  <td>{reservation.price}</td>
                  <td>{reservation.model}</td>
                  <td>{reservation.production_year}</td>
                  <td>{reservation.color}</td>
                  <td>{reservation.category}</td>
                  <td>{reservation.class_id}</td>
                  <td>{reservation.office_id}</td>
                  <td>{reservation.status}</td>
                  <td>{reservation.f_name}</td>
                  <td>{reservation.l_name}</td>
                  {/* Add more cells based on your data structure */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationsReport;
