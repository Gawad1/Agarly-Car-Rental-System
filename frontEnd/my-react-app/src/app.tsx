// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
