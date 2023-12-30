const dbConfig = require('./dbConfig');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3001;

app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection(dbConfig);
// Connect to the database

// Define a route for inserting a new car (POST request)
app.post('/car', (req, res) => {
  const {
    plate_id,
    model,
    production_year,
    color,
    photo,
    category,
    class_id,
    office_id,
    status,
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

// Additional routes or middleware can be added here...

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
