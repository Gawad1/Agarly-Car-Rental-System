import React, { useState } from 'react';

interface CarStatus {
  plate_id: number;
  status: string;
}

const DailyCarStatusReport: React.FC = () => {
  const [date, setDate] = useState('');
  const [carStatus, setCarStatus] = useState<CarStatus[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/carStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });

      if (response.ok) {
        const data = await response.json();
        setCarStatus(data);
      } else {
        console.error('Error fetching daily car status:', await response.text());
      }
    } catch (error) {
      console.error('Error during daily car status fetch:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Daily Car Status Report</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Generate Report</button>
      </form>

      {loading && <div>Loading...</div>}

      {carStatus.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Plate ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {carStatus.map((entry, index) => (
              <tr key={index}>
                <td>{entry.plate_id}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DailyCarStatusReport;
