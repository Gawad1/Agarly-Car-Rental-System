// app.js (main application)
const express = require('express');
const bodyParser = require('body-parser');

// const carRouter = require('./routers/CarPage');
const homeRouter = require('./routers/HomeRouter');
const carInsert = require('./routers/CarInsert');
const loginfunction = require('./routers/LoginRouter');
const carpage = require('./routers/CarPage');
const resPerCar = require('./routers/resPerCar');
const deletecar = require('./routers/deletecarRouter');
const histOfCustomer = require('./routers/historyOfCustomerRouter');
const reserverouter = require('./routers/reserveRouter');
const searchRouter = require('./routers/searchRouter');
const signupRouter = require('./routers/signupRouter');


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
app.use('/insertcar', carInsert(db));
app.use('/login', loginfunction(db));
app.use('/resPerCar', resPerCar(db));
app.use('/showcar', carpage(db));
app.use('/deletecar', deletecar(db));
app.use('/historyOfCustomer', histOfCustomer(db));
app.use('/reserveRouter', reserverouter(db));
app.use('/searchRouter', searchRouter(db));
app.use('/signup', signupRouter(db));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
