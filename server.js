const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors()); // Enable CORS

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware for parsing JSON in requests
app.use(bodyParser.json());

// Define the login endpoint
app.post('/login', async (req, res) => {
  const { username, password, otp } = req.body;

  // Check username and password in the database
  const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
  db.query(query, [username, password], async (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      // User is authenticated, now verify OTP
      const secret = 'your_secret_key'; // Replace with a secure secret key
      const isOTPValid = await verifyOTP(secret, otp);

      if (isOTPValid) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid OTP' });
      }
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
