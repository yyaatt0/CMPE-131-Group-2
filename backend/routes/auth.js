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
  console.log(req.session)
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
    
    //STORE USER ID AND NAME INTO SESSION USER
    const id = data[0].userID;
    const fname = data[0].fname;
    const lname = data[0].lname;
    //SET USER PARAMETERS TO CONST, CAN ADD MORE LATER
    req.session.userID = id; 
    req.session.userFname = fname; 
    req.session.userLname = lname; 
    console.log(req.session);
    console.log(req.session.userID);
    return res.json({ success: true, message: 'Login successful' });
  });
});

//ADMIN LOGIN, SIMILAR TO USER LOGIN BUT USES DIFF TABLE, DOES NOT SAVE SESSION
router.post("/adminlogin", (req, res) => {
  console.log(req.session)
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });

  //SQL SCRIPT TO SEND IF USER EXISTS
  const qry = "SELECT * FROM admin WHERE username = ? AND password = ?";

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

    return res.json({ success: true, message: 'Login successful' });
  });
});

//GET BALANCE
router.get("/balance/:userID", (req, res) => {
  console.log("Received userID:", req.session.userID); // Debug log

  const qry = "SELECT type, balance FROM accounts WHERE userID = ?";
  db.query(qry, [req.session.userID], (err, data) => {
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
router.post("/atmlogin", (req, res) => {
  const { username, pin } = req.body;
  console.log('ATM Login attempt:', { username, pin });

  const userQry = "SELECT users.userID, users.fname, users.lname, userpins.pin FROM users \
   INNER JOIN userpins ON users.userID=userpins.userID WHERE users.username = ? AND userpins.pin = ?";
  
  db.query(userQry, [username, pin], (err, data) => {
    if (err) {
      return res.json({ success: false, message: 'Database error' });
    }

    if (data.length === 0) {
      console.log("User has not been found.");
      return res.json({ success: false, message: 'Invalid username or pin' });
    }

    //STORE USER ID AND NAME INTO SESSION USER
    const id = data[0].userID;
    const fname = data[0].fname;
    const lname = data[0].lname;
    //SET USER PARAMETERS TO CONST, CAN ADD MORE LATER
    req.session.userID = id; 
    req.session.userFname = fname; 
    req.session.userLname = lname; 
    
    return res.json({ success: true, message: 'ATM login successful' });
  });
});
  
//FOR BALANCE ACTIONS (WITHDRAW AND DEPOSIT)
router.post("/balanceFeatures", (req, res) => {
  const { action, amount, accountType } = req.body;
  console.log('Feature attempt:', { action, amount, accountType });
  console.log("UserID: ", req.session.userID);

  //NEEDED BECAUSE AMOUNT IS SENT AS STRING, NEED TO APPEND TO '-' IF SUBTRACTION
  var floatAmount = amount;

  if(action == "withdraw") {
    floatAmount = "-" + amount;
  }

  //UPDATE BALANCE
  const qry = "UPDATE accounts SET balance = (balance + ?) WHERE  userID = ? AND type = ?";
  db.query(qry, [parseFloat(floatAmount), req.session.userID, accountType], (err, data) => {
    if (err) {
      return res.json({ success: false, message: 'Database error' });
    }
  })
  return res.json()
})

export default router;