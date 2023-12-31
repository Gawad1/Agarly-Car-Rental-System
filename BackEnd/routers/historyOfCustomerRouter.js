const express = require('express');
const router = express.Router();


// Create a connection to the MySQL database
const historyOfCustomer = (db) => {
  router.post("/", (req, res) => {
    const { ssn } = req.body;
    const query = 'SELECT * FROM reservation WHERE ssn = ?';

    db.query(query, [ssn], (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }
      const log = results[0];
      if (log) {
        res.json({ message: results });
      } else {
        res.status(401).json({ message: "No History found" });
      }
    });
  });
  return router;
};

module.exports = historyOfCustomer;
  