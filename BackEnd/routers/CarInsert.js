const express = require('express');
const router = express.Router();

const carInsert = (db) => {
  router.post('/', (req, res) => {
    const {
      plate_id,
      model,
      production_year,
      color,
      photo,
      category,
      class_id,
      office_id,
      status
    } = req.body;

    // Validate that required fields are provided
    if (!plate_id || !model || !production_year || !color || !category || !class_id || !office_id || !status) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Use the provided data to insert a new car into the database
    const query =
      'INSERT INTO car (plate_id, model, production_year, color, photo, category, class_id, office_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(
      query,
      [plate_id, model, production_year, color, photo, category, class_id, office_id, status],
      (err, result) => {
        if (err) {
          console.error('Error inserting new car', err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }

        res.json({ message: 'Car successfully inserted', carId: result.insertId });
      }
    );
  });

  return router;
};

module.exports = carInsert;
