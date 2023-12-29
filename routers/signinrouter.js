const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Sample user data (replace this with a database in a real-world scenario)
const users = [
  {
    username: 'john',
    password: 'password',
  },
];

app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find((u) => u.username === username);

  // Check if the user exists and the password is correct
  if (user && user.password === password) {
    res.json({ message: 'Sign-in successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
