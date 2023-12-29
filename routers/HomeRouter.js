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
