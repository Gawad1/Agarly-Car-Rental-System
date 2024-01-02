// src/AdminHomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Handle search functionality
    console.log('Searching for:', searchTerm);
    // Implement the logic for searching here
  };

  return (
    <div>
      <h2>Admin Home Page</h2>
      <div>
        <Link to="/insert-car">
          <button>Insert a Car</button>
        </Link>
        <Link to="/modify-car-status">
          <button>Modify Car Status</button>
        </Link>
        <Link to="/delete-car">
          <button>Delete a Car</button>
        </Link>
        <Link to="/reservations-report">
          <button>All Reservations within a Specified Period</button>
        </Link>
        <Link to="/car-reservations">
          <button>All Reservations of Any Car within a Specified Period</button>
        </Link>
        <Link to="/cars-status-day">
          <button>Status of All Cars on a Specific Day</button>
        </Link>
        <Link to="/customer-reservations">
          <button>All Reservations of Specific Customer</button>
        </Link>
        <Link to="/daily-payments">
          <button>Daily Payments within Specific Period</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHomePage;
