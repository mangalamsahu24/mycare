// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const server = express();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db',
});

db.connect((err) => {
  if (err) {
    console.log('Database connection failed: ', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
// Login API endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Check user credentials against the database
  const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    } else if (result.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
