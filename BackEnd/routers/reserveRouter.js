const express = require('express');
const router = express.Router();

const reserverouter = (db) => {
  router.post("/", (req, res) => {
    const {
      ssn,
      plate_id,
      pickup_date,
      return_date,
      price
    } = req.body;
  
    // Validate required fields
    if (!ssn || !plate_id || !pickup_date || !return_date || !price) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
  
    // Check for overlapping reservations
    const overlapCheckSql = `
      SELECT * FROM reservation
      WHERE ((? <= pickup_date AND ? >= return_date)
        OR (? >= pickup_date AND ? <= return_date)
        OR (? < pickup_date AND ? > return_date))
        AND plate_id = ?
    `;
  
    const overlapCheckParams = [pickup_date, pickup_date, return_date, return_date, pickup_date, return_date, plate_id];
  
    db.query(overlapCheckSql, overlapCheckParams, (err, overlapResults) => {
      if (err) {
        console.error("Error checking for overlapping reservations:", err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }
  
      if (overlapResults.length > 0) {
        res.status(409).json({ message: "Reservation overlaps with existing reservations" });
        return;
      }
  
      // No overlapping reservations, proceed with insertion
      const insertSql = `
        INSERT INTO reservation (ssn, plate_id, pickup_date, return_date, price)
        VALUES (?, ?, ?, ?, ?)
      `;
  
      const insertParams = [ssn, plate_id, pickup_date, return_date, price];
  
      db.query(insertSql, insertParams, (insertErr, insertResults) => {
        if (insertErr) {
          res.status(500).json({ message: "Error inserting into the database:" });
          return;
        }
        res.json({ message: "Reservation added successfully" });
      });
    });
  });
  return router;
  
};
module.exports = reserverouter;
  