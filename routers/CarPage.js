const express = require('express');
const router = express.Router();

const carpage = (db) => {
  // Define a route that accepts GET requests with the car plate id as a parameter
  router.get('/:plateId', (req, res) => {
    const plateId = req.params.plateId;

    // Use the plateId in your database query
    //const query = 'SELECT * FROM car WHERE plate_id = ?';
    const query = `
  SELECT car.*, reservation.pickup_date, reservation.return_date
  FROM car  LEFT JOIN reservation ON car.plate_id = reservation.plate_id
  where car.plate_id =1;
`;
    db.query(query, [plateId], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error retrieving car data' });
        return;
      }
      console.log(plateId);
      if (result.length === 0) {
        res.status(404).json({ message: 'Car not found' });
        return;
      }

      const carSpecs = {
        plate_id: result[0].plate_id,
        model: result[0].model,
        production_year: result[0].production_year,
        color: result[0].color,
        photo: result[0].photo,
        category: result[0].category,
        class_id: result[0].class_id,
        office_id: result[0].office_id,
        status: result[0].status,
      };
      const reservations = result.map((reservation) => ({
        pickup_date: reservation.pickup_date,
        return_date: reservation.return_date,
      }));
      const output = {
        car_specs: carSpecs,
        reservations: reservations,
      };

      res.json(output); // Assuming you want to send back the first matching car (if multiple found)
    });
  });

  return router;
};
module.exports = carpage;
