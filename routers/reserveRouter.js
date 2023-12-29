const dbConfig = require("./dbConfig");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const port = 3001;

app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection(dbConfig);

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});
app.post("/reserveRouter", (req, res) => {
  const { ssn, plate_id, pickup_date, return_date, price } = req.body;
  if (!ssn || !plate_id || !pickup_date || !return_date || !price) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  const sql = `
  INSERT INTO reservation (ssn, plate_id, pickup_date, return_date, price)
  VALUES (?, ?, ?, ?, ?)`;
  
  const params = [ssn, plate_id, pickup_date, return_date, price];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error querying the database:" });
      return;
    }
    res.json({ message: "Reservation added successfully" });
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
