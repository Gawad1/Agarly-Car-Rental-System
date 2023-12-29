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

app.get('/home', (req, res) => {
    const query = 'SELECT * FROM car ';
    db.query(query, (err, result) =>
    {
        if (err)
        {
            console.error('Error loading home page', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(result);
        
    })

   

})
    
   
    

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
