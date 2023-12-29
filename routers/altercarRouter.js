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
app.post('/altercar',(req,res) =>{
    
})

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});