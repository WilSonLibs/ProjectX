const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const authenticateToken = require('./middleware/auth');

const app = express();
const port = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Ensure JWT_SECRET is defined
if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
    console.error("JWT_SECRET or REFRESH_SECRET is not defined in the .env file.");
    process.exit(1);
}

// Setup MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Ensure connection is established
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to the database');
});

// Helper function to generate tokens
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};

// Signup Route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (result.length > 0) return res.status(400).json({ message: 'User already exists' });

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Server error' });

            db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword], (err, result) => {
                    if (err) return res.status(500).json({ message: 'Server error' });
                    res.status(201).json({ message: 'User created successfully' });
                });
        });
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (result.length === 0) return res.status(400).json({ message: 'User not found' });

        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Server error' });

            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const user = { id: result[0].id, username: result[0].username };
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            // Save refresh token to the database
            db.query('UPDATE users SET refreshToken = ? WHERE id = ?', [refreshToken, user.id], (err) => {
                if (err) return res.status(500).json({ message: 'Server error' });
                res.json({ accessToken, refreshToken });
            });
        });
    });
});

// Refresh Token Route
app.post('/token', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

    // Validate refresh token
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' });

        // Check if token matches the one in the database
        db.query('SELECT refreshToken FROM users WHERE id = ?', [user.id], (err, result) => {
            if (err || result.length === 0 || result[0].refreshToken !== refreshToken) {
                return res.status(403).json({ message: 'Invalid or expired refresh token' });
            }

            // Generate a new access token
            const newAccessToken = generateAccessToken({ id: user.id, username: user.username });
            res.json({ accessToken: newAccessToken });
        });
    });
});

// Logout Route
app.post('/logout', authenticateToken, (req, res) => {
    const userId = req.user.id;

    // Invalidate refresh token in the database
    db.query('UPDATE users SET refreshToken = NULL WHERE id = ?', [userId], (err) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.json({ message: 'Logged out successfully' });
    });
});

// Protected Route
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to your dashboard!', user: req.user });
});

// Update username route
app.put('/profile/username', authenticateToken, (req, res) => {
    const { username } = req.body;
    const userId = req.user.id;

    db.query('UPDATE users SET username = ? WHERE id = ?', [username, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating username' });
        }
        res.json({ message: 'Username updated successfully' });
    });
});

// Update password route
app.put('/profile/password', authenticateToken, (req, res) => {
    const { password } = req.body;
    const userId = req.user.id;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating password' });
            }
            res.json({ message: 'Password updated successfully' });
        });
    });
});

// Link Mobile Money Account
app.put('/profile/mobile-money', authenticateToken, (req, res) => {
    const { mobileMoneyAccount } = req.body;
    const userId = req.user.id;

    db.query('UPDATE users SET mobile_money_account = ? WHERE id = ?', [mobileMoneyAccount, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error linking mobile money account' });
        }
        res.json({ message: 'Mobile money account linked successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
