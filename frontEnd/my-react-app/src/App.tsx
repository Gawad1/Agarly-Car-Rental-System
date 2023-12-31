// src/App.tsx
import React from 'react';
import Home from './Home.tsx';
import './Home.css';


const App: React.FC = () => {
  return (
    <div>
      <h1>My React TypeScript App</h1>
      <Home />
    </div>
  );
};

export default App;