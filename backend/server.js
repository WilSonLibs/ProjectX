// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());

// Setup MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // your MySQL password
    database: 'projectx_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Signup Route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;

            // Insert user into the database
            db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword], (err, result) => {
                if (err) throw err;

                res.status(201).json({ message: 'User created successfully' });
            });
        });
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare password with hashed password
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) throw err;

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: result[0].id, username: result[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ message: 'Login successful', token });
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
