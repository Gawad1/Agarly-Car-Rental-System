const express = require('express');
const router = express.Router();
const deletecar = (db) => {
 

  // Create a connection to the MySQL database
  

  router.get('/:plateId', (req, res) => {
    const plateId = req.params.plateId;
    
  
    // Check if the plate_id exists in the database
    const checkQuery = 'SELECT * FROM Car WHERE Plate_id = ?';
    db.query(checkQuery, [plateId], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      // If no matching record is found, send a response indicating that the data doesn't exist
      if (results.length === 0) {
        return res.status(404).json({ message: 'Data not found in the database' });
      }
  
      // If the data exists, update the status of the car to indicate that it is no longer active
      const updateStatusQuery = 'UPDATE Car SET Status = ? WHERE Plate_id = ?';
      const newStatus = 'NA'; // You can choose an appropriate status
      db.query(updateStatusQuery, [newStatus, plateId], (err) => {
        if (err) {
          console.error('Error updating car status:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        // Send a success response after updating the status
        res.json({ message: 'Car status updated successfully' });
      });
    });
  });

  return router;
};
  
module.exports = deletecar;

  