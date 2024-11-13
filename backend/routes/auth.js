const express = require('express');
const db = require('../db'); // Import the database connection

const router = express.Router();

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });

    // Query the database for the user
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid username or password' });

    const user = results[0];

    // Compare plain text password
    if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Store user info in session
    req.session.user = { id: user.id, username: user.username };
    res.json({ success: true, message: 'Login successful' });
  
  });
});


module.exports = router;
