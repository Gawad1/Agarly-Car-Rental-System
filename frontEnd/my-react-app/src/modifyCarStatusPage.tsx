// src/ModifyCarStatusPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ModifyCarStatusPage: React.FC = () => {
  const [plateId, setPlateId] = useState('');
  const [action, setAction] = useState('enter'); // Default action is 'enter'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/altercar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, plate_id: plateId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log the response message from the server
      } else {
        console.error('Error modifying car status:', await response.text());
      }
    } catch (error) {
      console.error('Error during car status modification:', error.message);
    }
  };

  return (
    <div>
      <h2>Modify Car Status</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Plate ID:
          <input
            type="text"
            value={plateId}
            onChange={(e) => setPlateId(e.target.value)}
            required
          />
        </label>
        <label>
          Action:
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            required
          >
            <option value="enter">Enter Service</option>
            <option value="exit">Exit Service</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Link to="/admin-home">
        <button>Go Back to Admin Home</button>
      </Link>
    </div>
  );
};

export default ModifyCarStatusPage;
