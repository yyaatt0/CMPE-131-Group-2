import express from 'express';

import db from '../db.js'; // Import the database connection

const router = express.Router();

router.get("/users", (req, res) => {
    const qry = "SELECT * FROM users"
    db.query(qry, (err, data) => {
        if(err) return res.json(err)
            return res.json(data)
    })
})


//USER LOGIN METHOD, REQUEST USERNAME & PASSWORD
//SEND DATA TO DATABASE THROUGH POST METHOD
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });

  //SQL SCRIPT TO SEND IF USER EXISTS
  const qry = "SELECT * FROM users WHERE username = ? AND password = ?";

  //SEND FIRST REQ 'USERNAME' TO FIRST ? AND SECOND REQ 'PASS' TO SECOND ?
  db.query(qry, [username, password], (err, data) => {
    //DEFAULT
    if (err) {
      return res.json({ success: false, message: 'Database error' });
    }

    //QUERY RETURNS RESULT AS ARRAY OF FOUND ITEMS, IF ARRAY IS > 0 THEN USER + PASS IS INSIDE DB

    if (data.length === 0) {
      console.log("User has not been found.");
      return res.json({ success: false, message: 'Invalid username or password' });
    }

    console.log("User has been found.");
    // req.session.user = { id: data[0].id, username: data[0].username }; // Store session
    return res.json({ success: true, message: 'Login successful' });
  });
});

router.get("/balance/:userID", (req, res) => {
  const userID = req.params.userID;
  console.log("Received userID:", userID); // Debug log

  const qry = "SELECT balance FROM accounts WHERE userID = ?";
  db.query(qry, [userID], (err, data) => {
      if (err) {
          console.error("Database error details:", err); // Log full error details
          return res.json({ success: false, message: "Database error", error: err });
      }

      if (data.length === 0) {
          return res.json({ success: false, message: "User not found" });
      }

      return res.json({ success: true, balance: data[0].balance });
  });
});
  

// // ATM LOGIN METHOD, REQUEST USERNAME & PIN
router.post("/atm-login", (req, res) => {
  const { username, pin } = req.body;
  console.log('ATM Login attempt:', { username, pin });

  const userQry = "SELECT * FROM users WHERE username = ?";
  
  db.query(userQry, [username], (err, userData) => {
    if (err) {
      return res.json({ success: false, message: 'Database error' });
    }

    if (userData.length === 0) {
      console.log("User has not been found.");
      return res.json({ success: false, message: 'Invalid username or pin' });
    }

    // User found, now check if the PIN matches
    const userID = userData[0].userID; // Assuming userID is the unique identifier for the user
    const pinQry = "SELECT * FROM userPins WHERE userID = ? AND pin = ?";
    
    db.query(pinQry, [userID, pin], (err, pinData) => {
      if (err) {
        return res.json({ success: false, message: 'Database error' });
      }

      if (pinData.length === 0) {
        console.log("Incorrect PIN.");
        return res.json({ success: false, message: 'Invalid username or pin' });
      }

      console.log("ATM Login successful.");
      return res.json({ success: true, message: 'ATM login successful' });
    });
  });
});
  

export default router;