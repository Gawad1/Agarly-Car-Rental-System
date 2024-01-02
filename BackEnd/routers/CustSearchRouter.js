const express = require('express');
const router = express.Router();

const CustSearch = (db) => {
  router.post('/', (req, res) => {
    const { ssn } = req.body;

    // Validate that required fields are provided
    if (!ssn) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    let query = `
          SELECT c.ssn, c.f_name,c.l_name,c.b_d,c.gender, c.email, r.res_id, r.res_date, r.pickup_date,r.return_date, r.plate_id 
          FROM customer as c
          left JOIN reservation as r ON c.ssn = r.ssn
          WHERE c.ssn=?`;

    db.query(query, [ssn], (err, result) => {
      if (err) {
        console.error('Error retrieving reservations', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });

  return router;
};

module.exports = CustSearch;