
const express = require('express');
const router = express.Router();

const altercarRouter = (db) => {
  router.post('/', (req, res) => {
    const { action, plate_id } = req.body;

    if (!action || !plate_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (action === 'enter') {
      // Check if car status is not 'Out-Of-Service'
      const checkStatusQuery = 'SELECT Status FROM Car WHERE Plate_id = ?';
      db.query(checkStatusQuery, [plate_id], (err, results) => {
        if (err) {
          console.error('Error querying the database:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log(results[0]);
        if (results.length === 0 || results[0].Status === 'Out-Of-Service') {
          console.log('st');
          return res.status(403).json({ message: 'Car status is Out-Of-Servic or doesnt exist in car table. Cannot enter.' });
        }

        // Continue with entering logic
        const insertQuery = 'INSERT INTO servicelog (plate_id) VALUES (?)';
        db.query(insertQuery, [plate_id], (err) => {
          if (err) {
            console.error('Error inserting into the database:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }

          const updateCarStatusQuery = 'UPDATE car SET Status = ? WHERE Plate_id = ?';
          const newCarStatus = 'Out-Of-Service';
          db.query(updateCarStatusQuery, [newCarStatus, plate_id], (err) => {
            if (err) {
              console.error('Error updating car status:', err);
              return res.status(500).json({ message: 'Internal Server Error' });
            }

            res.json({ message: 'Car entered and status updated successfully' });
          });
        });
      });
    } else if (action === 'exit') {
      // Check if car status is not 'Available'
      const checkStatusQuery = 'SELECT Status FROM Car WHERE Plate_id = ? AND Status != ?';
      db.query(checkStatusQuery, [plate_id, 'Available'], (err, results) => {
        if (err) {
          console.error('Error querying the database:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log(results[0]);
        if (results.length === 0 || results[0].Status === 'active') {
          return res.status(403).json({ message: 'Car status is Available or doesnt exist in car table. Cannot enter.' });
        }

        // Continue with exiting logic
        const updateCarStatusQuery = 'UPDATE car SET Status = ? WHERE Plate_id = ?';
        const newCarStatus = 'active';
        db.query(updateCarStatusQuery, [newCarStatus, plate_id], (err) => {
          if (err) {
            console.error('Error updating car status:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }

          const updateServiceLogQuery = 'UPDATE servicelog SET end_date = ? WHERE Plate_id = ?';
          const currentDate = new Date();
          db.query(updateServiceLogQuery, [currentDate, plate_id], (err) => {
            if (err) {
              console.error('Error updating service log:', err);
              return res.status(500).json({ message: 'Internal Server Error' });
            }

            res.json({ message: 'Car exited, status updated, and service log updated successfully' });
          });
        });
      });
    }
  });
  return router;
};

module.exports = altercarRouter;