// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Endpoint to handle saving user profile data
app.post('/save-profile', (req, res) => {
  const userData = req.body;
  // Save userData to a database or file

  console.log('Received user data:', userData);
  res.json({ success: true });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});