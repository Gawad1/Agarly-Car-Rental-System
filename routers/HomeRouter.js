
// homeRouter.js
const express = require('express');
const router = express.Router();

// Accept the database connection as a parameter
const homeRouter = (db) => {
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM car where status!="NA" ';

    db.query(query, (err, result) => {
      if (err)
        {
            console.error('Error loading home page', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(result);// ... (rest of the code)
    });
  });

  return router;
};

module.exports = homeRouter;
