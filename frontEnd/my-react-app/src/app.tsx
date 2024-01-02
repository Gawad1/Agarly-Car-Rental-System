// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './Components/CarList.tsx';
import CarDetailsWrapper from './Components/CarDetailsWrapper.tsx';
import LoginPage from './Components/LoginPage.tsx';
import SignupPage from './Components/SignupPage.tsx'; // Import SignupPage
import { UserProvider } from './Components/UserContext.tsx';
import AdminHomePage from './AdminHomePage.tsx';
import ModifyCarStatusPage from './modifyCarStatusPage.tsx'; // Correct import
import ReservationsReport1 from './Allresfromto.tsx'; // Import the ReservationsReport component
import ReservationsReport2 from './resoffromto.tsx'; 
import InsertCar from './CarInsertForm.tsx';
import DailyPaymentsReport from './dailyPayments.tsx';
import CustomerDetails from './custSearch.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<CarList />} />
        <Route path="/showcar/:plate_id" element={<CarDetailsWrapper />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Add this line */}
        <Route path="/admin-home" element={<AdminHomePage />} />
        <Route path="/modify-car-status" element={<ModifyCarStatusPage />} />
        <Route path="/car-reservations" element={<ReservationsReport2 />} />
        <Route path="/insert-car" element={<InsertCar />} />
        <Route path="/daily-payments" element={<DailyPaymentsReport />} />
        <Route path="/customer-reservations" element={<CustomerDetails />} />
        <Route path="/reservations-report" element={<ReservationsReport1 />} /> {/* Add the route for ReservationsReport */}
        
        {/* Add other routes as needed */}
      </Routes>
      </Router>
      );



}

export default App;
