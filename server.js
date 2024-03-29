const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

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

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Middleware for parsing JSON in requests
app.use(bodyParser.json());

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const { originalname, filename } = req.file;

    // Insert file details into the database
    const query = 'INSERT INTO files (originalname, filename) VALUES (?, ?)';
    db.query(query, [originalname, filename], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json({ success: true, message: 'File uploaded successfully' });
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// File list endpoint
app.get('/files', (req, res) => {
  // Retrieve list of files from the database
  const query = 'SELECT * FROM files';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

// Define the login endpoint
// app.post('/login', async (req, res) => {
//   const { username, password, otp } = req.body;

//   // Check username and password in the database
//   const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
//   db.query(query, [username, password], async (err, results) => {
//     if (err) {
//       console.error('Error executing MySQL query: ', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }

    // if (results.length > 0) {
    //   // User is authenticated, now verify OTP
    //   const secret = 'your_secret_key'; // Replace with a secure secret key
    //   const isOTPValid = await verifyOTP(secret, otp);

    //   if (isOTPValid) {
    //     res.json({ success: true, message: 'Login successful' });
    //   } else {
    //     res.json({ success: false, message: 'Invalid OTP' });
    //   }
    // } 
//     else {
//       res.json({ success: false, message: 'Invalid username or password' });
//     }
//   });
// });
// Add this before other routes in your server.js
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Login endpoint
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  // Perform a MySQL query to check username and password
  const query = 'SELECT * FROM login WHERE name = ? AND password = ?';
  db.query(query, [name, password], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      // Successful login
      res.json({ success: true, message: 'Login successful well done' });
    } else {
      // Invalid credentials
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

//Register user
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists
  const checkQuery = 'SELECT * FROM login WHERE email = ?';
  db.query(checkQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error checking existing user:', err);
      return res.status(500).json({ success: false, message: 'Registration failed' });
    }

    if (results.length > 0) {
      // Email already exists, alert the user or handle accordingly
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    try {
      // Email does not exist, proceed with registration
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
      const insertQuery = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ success: false, message: 'Registration failed' });
        }

        res.json({ success: true, message: 'Registration successful' });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      return res.status(500).json({ success: false, message: 'Registration failed' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// 