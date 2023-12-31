const express = require('express');
const router = express.Router();

const resPerCar = (db) => {
    router.post('/', (req, res) => {
      const {
        reportType, // New parameter for report type
        startDate,  // New parameter for start date
        endDate     // New parameter for end date
      } = req.body;
  
      // Validate that required fields are provided
      if (!reportType || !startDate || !endDate) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }
  
      let query = '';
  
      if (reportType === 'ReservationsCarCustomer') {
        // Query to get all reservations within a specified period with car and customer information
        query = `
          SELECT *
          FROM reservation
          JOIN car ON reservation.plate_id = car.plate_id
          JOIN customer ON reservation.ssn = customer.ssn
          WHERE reservation.res_date BETWEEN ? AND ?
        `;
      } else if (reportType === 'ReservationsCar') {
        // Query to get all reservations of any car within a specified period with car information
        query = `
          SELECT *
          FROM reservation
          JOIN car ON reservation.plate_id = car.plate_id
          WHERE reservation.res_date BETWEEN ? AND ?
        `;
      } else {
        res.status(400).json({ message: 'Invalid report type' });
        return;
      }
  
      db.query(query,[startDate, endDate],(err, result) => {
          if (err) {
            console.error('Error retrieving reservations', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
          }
  
          res.json(result);
        }
      );
    });
  
    return router;
  };
  
  module.exports = resPerCar;