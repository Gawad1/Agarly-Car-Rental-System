const express = require('express');
const router = express.Router();

const DailyPay = (db) => {
  router.post('/', (req, res) => {
    const { startDate, endDate } = req.body;

    // Validate that required fields are provided
    if (!startDate || !endDate) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    let query = `
    SELECT pickup_date, SUM(price) AS total_pay
    FROM reservation
    WHERE pickup_date BETWEEN ? AND ?
    GROUP BY pickup_date`;

    db.query(query, [startDate, endDate], (err, result) => {
      if (err) {
        console.error('Error retrieving reservations', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      // Assuming pickup_date is part of the result
      res.json(result);
    });
  });

  return router;
};

module.exports = DailyPay;