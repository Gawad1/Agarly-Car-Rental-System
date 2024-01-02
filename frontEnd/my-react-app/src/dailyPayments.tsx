import React, { useState } from 'react';

const DailyPaymentsReport: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [payments, setPayments] = useState<{ pickup_date: string; total_pay: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/dailyPay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      } else {
        console.error('Error fetching daily payments:', await response.text());
      }
    } catch (error) {
      console.error('Error during daily payments fetch:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Daily Payments Report</h2>
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
        <button type="submit">Generate Report</button>
      </form>

      {loading && <div>Loading...</div>}

      {payments.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Payment</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.pickup_date).toLocaleDateString()}</td>
                <td>{entry.total_pay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DailyPaymentsReport;
