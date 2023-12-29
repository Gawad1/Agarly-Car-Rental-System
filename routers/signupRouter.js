const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'usera',
  password: 'passa',
  database: 'gsff',
});
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });

  app.post('/signup', (req, res) => {
    const {SSN, Fname, Lname,gender,  email, password,confirmpassword } = req.body;
    app.post('/signup', (req, res) => {
        const { SSN, Fname, Lname, gender, email, password, confirmpassword } = req.body;
      
        
        if (!SSN || !Fname || !Lname || !gender || !email || !password || !confirmpassword) {
          return res.status(400).json({ message: 'All fields are required' });
        }
      
        // Validate password and confirm password
        if (password !== confirmpassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
        }
      
        // Insert user data into the database
        const insertQuery = 'INSERT INTO Customer (ssn, f_name, l_name, gender, email, pass) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [SSN, Fname, Lname, gender, email, password], (err, results) => {
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
         
  })
