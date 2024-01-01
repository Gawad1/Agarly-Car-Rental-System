// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './Components/CarList.tsx';
import CarDetailsWrapper from './Components/CarDetailsWrapper.tsx';
import LoginPage from './Components/LoginPage.tsx';
import SignupPage from './Components/SignupPage.tsx'; // Import SignupPage
import { UserProvider } from './Components/UserContext.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/home" element={<CarList />} />
          <Route path="/showcar/:plate_id" element={<CarDetailsWrapper />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> {/* Add this line */}
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
