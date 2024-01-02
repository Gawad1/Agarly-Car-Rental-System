const express = require('express');
const cors = require('cors'); // Import the cors middleware
const router = express.Router();

const LoginRouter = (db) => {
  // Use cors middleware before handling routes
  router.use(cors());

  router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Query the database to find the user by email
    const query = 'SELECT * FROM customer WHERE email = ? ';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      console.log(results);

      // Check if the user exists and the password is correct
      const user = results[0];
      if (user && user.pass === password) {
        res.json({ message: 'Login successful' });
      }
      else {
        res.status(401).json({ message: 'Invalid credentials' });
      
        console.log(user);
      }
    });
  });

  return router;
};

module.exports = LoginRouter;
