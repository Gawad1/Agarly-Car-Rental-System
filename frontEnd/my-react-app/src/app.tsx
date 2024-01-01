// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './CarList.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarList />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
