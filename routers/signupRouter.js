const dbConfig = require('./dbConfig');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3001;

app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection(dbConfig);
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });
app.post('/signup', (req, res) => {
        const { SSN, Fname, Lname, gender, email, password, confirmpassword, date } = req.body;
        if (!SSN || !Fname || !Lname || !gender || !email || !password || !confirmpassword ||!date) {
          return res.status(400).json({ message: 'All fields are required' });
        }
      
        // Validate password and confirm password
        if (password !== confirmpassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
        }
      
        // Insert user data into the database
        const insertQuery = 'INSERT INTO Customer (ssn, f_name, l_name, gender, email, pass, b_d) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [SSN, Fname, Lname, gender, email, password, date], (err, results) => {
          if (err) {
            console.error('Error inserting into the database:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
      
          console.log('User signed up successfully');
          res.json({ message: 'Sign-up successful' });
        });
});
      
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
