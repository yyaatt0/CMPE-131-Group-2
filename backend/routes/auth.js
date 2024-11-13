const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const db = require('../db'); // Import the database connection

const router = express.Router();
//const JWT_SECRET = process.env.JWT_SECRET;

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database for the user
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid username or password' });

    const user = results[0];

    // // Validate password
    // const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    // if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' });

    // // Generate JWT token
    // const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    // res.json({ success: true, token });

    // Compare plain text password
    if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Store user info in session
    req.session.user = { id: user.id, username: user.username };
    res.json({ success: true, message: 'Login successful' });
  
  });
});

// Logout Route
// router.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) return res.status(500).json({ error: 'Logout failed' });
//         res.json({ success: true, message: 'Logged out successfully' });
//     });
// });

module.exports = router;
