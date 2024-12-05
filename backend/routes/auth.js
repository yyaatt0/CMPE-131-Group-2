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

//REGRISTRATION FUNCTION
router.post("/signup", (req,res) => {
  const{fname, lname, email, username, password, pin} = req.body;

  const qry = "INSERT INTO users (password, username, fname, lname, email) VALUES (?, ?, ?, ?, ?)";

  //INSERTS INTO THE USERS DATABASE FIRST SINCE USERID NEEDS TO BE GENERATED
  //SINCE THE PIN HAS TO BE STORED IN A DIFFERENT TABLE, THE DATABASE MUST BE CALLED 3 TIMES
  //BEING CAREFUL OF TRANSACTIONS IS NOT REALLY REQUIRED
  
  //FILL UP ALL ROWS ON THE USER TABLE
  db.query (qry, [password, username, fname, lname, email], (err, data) => {
    if (err) {
      return res.json ({ success: false, message: 'Database error 1' });
    }
    const qry1 = "SELECT UserID FROM users WHERE username = ?";
    // GET NEWLY GENERATED USERID FOR THE RECENTLY INSERTED USER
    db.query (qry1, [username], (err, data2) => {
      if (err) {
        return res.json ({ success: false, message: 'Database error 2' });
      }
      const id = data2[0].UserID;
      const qry2 = "INSERT INTO userpins (UserID, pin) VALUES (?,?)";
      //INSERT USERID AND PIN INTO USERPINS TABLE
      db.query (qry2, [id, pin], (err, data3) => {
        if (err) {
          return res.json ({ success: false, message: 'Database error 3' });
        }
      });
    });
  });
});
//"CHECK IF USERNAME IS ALREADY IN DATA" FUNCTION (USED IN REGISTRATION PAGE)
router.get("/checkuser", (req, res) =>{
  const {username} = req.query;
  if (!username) {
    return res.json({ success: false, message: "Email is missing" });
  }
  const qry = "SELECT users.username FROM users WHERE users.username = ?";

  db.query(qry, [username], (err, data) =>{
    if(err){
      return res.json({ success: false, message: 'Database error' });
    }
      if(data.length === 0){
        return res.json({ success: true, message: "Username is not in the database"});
      }
        return res.json({ success: false, message: "Username already used"});
  });

});

//"CHECK IF EMAIL IS ALREADY IN DATA" FUNCTION (USED IN REGISTRATION PAGE)
router.get("/check", (req, res) =>{
  const {email} = req.query;
  console.log("Email from request body:", email);
  if (!email) {
    return res.json({ success: false, message: "Email is missing" });
  }
  const qry = "SELECT users.email FROM users WHERE users.email = ?";

  db.query(qry, [email], (err, data) =>{
    if(err){
      return res.json({ success: false, message: 'Database error' });
    }
      if(data.length === 0){
        return res.json({ success: true, message: "Email is not in the database"});
      }
        return res.json({ success: false, message: "Email already used"});
  });

});

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

// get user first and last name
router.get('/user/details', (req, res) => {
  console.log("Session ID in /user/details:", req.sessionID);
  console.log("Session Data in /user/details:", req.session);

  if (!req.session.userID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  const { userFname, userLname } = req.session;

  if (!userFname || !userLname) {
    return res.status(400).json({ success: false, message: 'User details missing in session' });
  }

  return res.json({
    success: true,
    firstName: userFname,
    lastName: userLname
  });
});

//GET BALANCE
router.get('/balance/userBalance', (req, res) => {
  console.log("Session ID in /balance:", req.sessionID);
  console.log("Session Data in /balance:", req.session);

  if (!req.session.userID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  const qry = "SELECT balance FROM accounts WHERE userID = ?";

  db.query(qry, [req.session.userID], (err, data) => {
      if (err) {
          console.error("Database error details:", err); // Log full error details
          return res.json({ success: false, message: "Database error", error: err });
      }

      if (data.length === 0) {
          return res.json({ success: false, message: "User not found" });
      }
      console.log(data)

      return res.json({ 
          success: true, 
          balances: {
              Checking: data[0]?.balance || 0, // Assuming the first entry is Checking
              Savings: data[1]?.balance || 0   // Assuming the second entry is Savings
          } 
      });
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

    console.log("Session ID in /atmlogin:", req.sessionID);
    console.log("Session Data in /atmlogin:", req.session);

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
  var actionType = 0;
  var accountID = 0;

  if(action == "withdraw") {
    floatAmount = "-" + amount;
    actionType = 1;
  }

  //UPDATE BALANCE
  const qry = "UPDATE accounts SET balance = (balance + ?) WHERE  userID = ? AND type = ?";
  db.query(qry, [parseFloat(floatAmount), req.session.userID, accountType], (err, data) => {
    if (err) {
      return res.json({ success: false, message: 'Database error' });
    }
  })

  const transactQry = "INSERT INTO transactionhistory (accountID, transactionType, amount, tracker) VALUES (?, ?, ?, CURDATE())";
  const findAccID = "SELECT accountID FROM bank.accounts WHERE userID = ? AND type = ?";
  db.query(findAccID, [req.session.userID, accountType], (err, data) => {
    if (err) {
      return res.json({ success: false, message: 'Database error' });
    }

    accountID = data[0].accountID;
    
    console.log(accountID);
    console.log(actionType);
    
    //CALL TRANSACT QUERY TO INPUT DATA
    db.query(transactQry, [parseInt(accountID), parseInt(actionType), parseFloat(floatAmount)], (err, data) => {
      if (err) {
        console.log("FAILURE")
      }
    })
    
  })

  return res.json()
})

export default router;