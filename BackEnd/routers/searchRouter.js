const express = require('express');
const router = express.Router();

const searchRouter = (db) => {
  router.post("/", (req, res) => {
    const { color, model, category, class_id, office_id } = req.body;
    const params = [];
    let sql = "SELECT * FROM car WHERE status != 'NA' ";

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
  return router;
};

module.exports = searchRouter;
