const express = require('express');
const router = express.Router();

const CarStatus = (db) => {
  router.post('/', (req, res) => {
    const { date } = req.body;
    // Validate that required fields are provided
    if (!date) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    let query = `
    SELECT c.plate_id, 
             CASE 
               WHEN c.status = 'NA' THEN 'NA'
               WHEN r.res_id IS NOT NULL THEN 'rented'
               WHEN slog.plate_id IS NOT NULL THEN 'out of service'
               ELSE 'available'
             END AS status
      FROM car as c
      LEFT JOIN reservation as r ON c.plate_id = r.plate_id AND ? >= r.pickup_date AND ? <= r.return_date
      LEFT JOIN servicelog as slog ON c.plate_id = slog.plate_id AND ? >= slog.start_date AND ? <= COALESCE(slog.end_date, ?)`;

    const params = [date, date, date, date, date];
    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Error retrieving car status', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });

  return router;
};

module.exports = CarStatus;
