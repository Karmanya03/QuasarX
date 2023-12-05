// app.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Routes and CRUD operations go here

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





// Inside your routes or handlers

// Create (Register a new user)
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = hashPasswordFunction(password); // Implement a password hashing function
  
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, results) => {
      if (err) throw err;
      res.send('User registered successfully');
    });
  });
  
  // Read (Retrieve user details)
  app.get('/profile', (req, res) => {
    const userId = req.session.userId; // Extract user ID from the session
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });
  
  // Update (Update user details)
  app.post('/update-profile', (req, res) => {
    const { username, email } = req.body;
    const userId = req.session.userId;
  
    const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    db.query(sql, [username, email, userId], (err, results) => {
      if (err) throw err;
      res.send('Profile updated successfully');
    });
  });
  