// app.js (main application)
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dbConfig = require('./routers/dbConfig');
const cron = require('node-cron');
const moment = require('moment');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

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
const homeRouter = require('./routers/HomeRouter')(db);
const carInsert = require('./routers/CarInsert')(db);
const loginfunction = require('./routers/LoginRouter')(db);
const carpage = require('./routers/CarPage')(db);
const resPerCar = require('./routers/resPerCar')(db);
const deletecar = require('./routers/deletecarRouter')(db);
const histOfCustomer = require('./routers/historyOfCustomerRouter')(db);
const reserverouter = require('./routers/reserveRouter')(db);
const searchRouter = require('./routers/searchRouter')(db);
const signupRouter = require('./routers/signupRouter')(db);
const altercarRouter = require('./routers/altercarRouter')(db);
const CustSearch = require('./routers/CustSearchRouter')(db);
const DailyPay = require('./routers/dailyPay')(db);
const CarStatusRouter = require('./routers/CarStatusRouter')(db);

app.use('/home', homeRouter);
app.use('/insertcar', carInsert);
app.use('/login', loginfunction);
app.use('/resPerCar', resPerCar);
app.use('/showcar', carpage);
app.use('/deletecar', deletecar);
app.use('/historyOfCustomer', histOfCustomer);
app.use('/reserveRouter', reserverouter);
app.use('/searchRouter', searchRouter);
app.use('/signup', signupRouter);
app.use('/altercar', altercarRouter);
app.use('/customerSearch', CustSearch);
app.use('/dailyPay', DailyPay);
app.use('/carStatus', CarStatusRouter);

async function updateCarStatus() {
  try {
    const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');

    // Query reservations with pickup date or return date <= current timestamp
    const query = `
    UPDATE car
JOIN (
    SELECT
        reservation.plate_id,
        MAX(reservation.pickup_date) AS latest_pickup_date,
        MAX(reservation.return_date) AS latest_return_date
    FROM
        reservation
    WHERE
        reservation.return_date IS NOT NULL
    GROUP BY
        reservation.plate_id
) AS latest_reservations ON car.plate_id = latest_reservations.plate_id
SET car.status = CASE
    WHEN latest_reservations.latest_pickup_date <= ? AND (latest_reservations.latest_return_date >= ?) THEN 'Rented'
    WHEN latest_reservations.latest_return_date <= ? THEN 'Active'
    ELSE car.status
END;
  `;
  
  await db.promise().query(query, [currentTimestamp, currentTimestamp,currentTimestamp,currentTimestamp]);
  
    console.log('Car statuses updated successfully.');
  } catch (error) {
    console.error('Error updating car statuses:', error.message);
  }
}

// Automation
cron.schedule('*/10 * * * * *', async () => {
  console.log('Running car status update task...');
  await updateCarStatus();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
