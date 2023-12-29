const dbConfig = require('./dbConfig');
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const port = 3006;

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
app.post("/searchRouter", (req, res) => {
  const { color, model, category, class_id,office_id } = req.body;
  const params = [];
  let sql = "SELECT * FROM car WHERE 1";

  if (color) {
    sql += " AND color = ?";
    params.push(color);
  }

  if (model) {
    sql += " AND model = ?";
    params.push(model);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (class_id) {
    sql += " AND class_id = ?";
    params.push(class_id);
  }
  if (office_id) {
    sql += " AND office_id = ?";
    params.push(office_id);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }   
    const car = results[0];
    if (car) {
      res.json({ message: results });
    } else {
      res.status(401).json({ message: "No cars found" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
