const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3001;

app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '@Feezo139',
   database: 'carrentalsystem',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define a route that accepts GET requests with the car plate id as a parameter
app.get('/car/:plateId', (req, res) => {
  const plateId = req.params.plateId;

  // Use the plateId in your database query
  const query = 'SELECT * FROM car WHERE plate_id = ?';

  db.query(query, [plateId], (err, result) => {
    if (err) {
      console.error('Error retrieving car data', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }

    res.json(result[0]); // Assuming you want to send back the first matching car (if multiple found)
  });
});

    
   
    

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
