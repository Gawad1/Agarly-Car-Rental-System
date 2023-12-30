// app.js (main application)
const express = require('express');
const bodyParser = require('body-parser');

// const carRouter = require('./routers/CarPage');
const homeRouter = require('./routers/HomeRouter');
const carInsert = require('./routers/CarInsert');
const loginfunction = require('./routers/LoginRouter');
const mysql = require('mysql2');
const dbConfig = require('./routers/dbConfig');


const app = express();
const port = 3001;

app.use(bodyParser.json());

// Create a single database connection
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Pass the database connection to routers
// app.use('/car', carRouter(db));
 app.use('/home', homeRouter(db)); 
app.use('/carinsert', carInsert(db));
app.use('/login', loginfunction(db));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
