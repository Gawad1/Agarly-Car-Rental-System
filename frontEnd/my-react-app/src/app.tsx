// src/App.tsx
import React from 'react';
import CarPage from './CarPage.tsx';

const App: React.FC = () => {
  return (
    <div>
      <h1>My React TypeScript App</h1>
      <CarPage plateId="1" /> {/* Assuming you want to fetch details for plate ID 1 */}
    </div>
  );
};

export default App;