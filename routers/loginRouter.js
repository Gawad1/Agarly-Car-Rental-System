const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: '192.168.1.103',
  user: 'usera',
  password: 'passa',
  database: 'gsff',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database to find the user by email
  const query = 'SELECT * FROM customer WHERE email = ? AND pass = ?';
  db.query(query, [email,password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    // Check if the user exists and the password is correct
    const user = results[0];
    if (user && user.pass === password) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
