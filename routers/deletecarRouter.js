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
app.post('/deletecar',(req,res) =>{
    const {plate_id } = req.body
})

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});