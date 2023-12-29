const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "192.168.1.8",
  user: "usera",
  password: "passa",
  database: "gsff",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});
app.post("/historyOfCustomer", (req, res) => {
  const {ssn} = req.body;
  const query = 'SELECT * FROM reservation WHERE ssn = ?';

  db.query(query, [ssn], (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }   
    const log = results[0];
    if (log) {
      res.json({ message: results });
    } else {
      res.status(401).json({ message: "No History found" });
    }
  });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  