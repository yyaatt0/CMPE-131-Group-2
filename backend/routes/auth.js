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
  const{fname, lname, username, email, password, pin} = req.body;
  const qry = "INSERT INTO users (fname, lname, username, email, password) VALUES (?, ?, ?, ?, ?)";
  const qry1 = "SELECT userID FROM users WHERE username = ?";
  const qry2 = "INSERT INTO userpins (userID, pin) VALUES (?,?)";
  //INSERTS INTO THE USERS DATABASE FIRST SINCE USERID NEEDS TO BE GENERATED
  //SINCE THE PIN HAS TO BE STORED IN A DIFFERENT TABLE, THE DATABASE MUST BE CALLED 3 TIMES
  //BEING CAREFUL OF TRANSACTIONS IS NOT REALLY REQUIRED
  
  //FILL UP ALL ROWS ON THE USER TABLE
  db.query (qry, [fname, lname, username, email, password], (err, data) => {
    if (err) {
      return res.json ({ success: false, message: 'Database error 1' });
    }

    // GET NEWLY GENERATED USERID FOR THE RECENTLY INSERTED USER
    db.query (qry1, [username], (err, data2) => {
      if (err) {
        return res.json ({ success: false, message: 'Database error 2' });
      }

      console.log(data2[0].userID);

      //INSERT USERID AND PIN INTO USERPINS TABLE
      db.query (qry2, [data2[0].userID, parseInt(pin)], (err, data3) => {
        if (err) {
          return res.json ({ success: false, message: 'Database error 3' });
        }
        console.log("name from request body:", fname, lname, username, email, password);
        return res.json ({ success: true, message: 'No Errors' });
      });
    });
  });
});
//"CHECK IF USERNAME IS ALREADY IN DATA" FUNCTION (USED IN REGISTRATION PAGE)
router.post("/checkuser", (req, res) =>{
  const {username} = req.body;
  if (!username) {
    return res.json({ success: false, message: "Username is missing" });
  }
  const qry = "SELECT users.username FROM users WHERE users.username = ?";

  db.query(qry, [username], (err, data) =>{
    if(err){
      return res.json({ success: false, message: 'Database error' });
    }
      if(data.length === 0){
        return res.json({ success: true, message: "Username is not in the database"});
      }
      else {
        return res.json({ success: false, message: "Username already used"});
      }
    });
});

//"CHECK IF EMAIL IS ALREADY IN DATA" FUNCTION (USED IN REGISTRATION PAGE)
router.post("/check", (req, res) =>{
  const {email} = req.body;
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
    else {
      return res.json({ success: false, message: "Email already used"});
    }
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
    //console.log(req.session);
    //console.log(req.session.userID);
    return res.json({ success: true, message: 'Login successful' });
  });
});

//ADMIN LOGIN, SIMILAR TO USER LOGIN BUT USES DIFF TABLE, DOES NOT SAVE SESSION
router.post("/adminlogin", (req, res) => {
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

    //STORE USER ID AND NAME INTO SESSION USER
    const admin_id = data[0].adminID;
    const adminfname = data[0].fname;
    const adminlname = data[0].lname;
    //SET USER PARAMETERS TO CONST, CAN ADD MORE LATER
    req.session.adminID = admin_id; 
    req.session.adminFname = adminfname; 
    req.session.adminNname = adminlname; 
    console.log("Session Data in /adminlogin:", admin_id);
    console.log("Session ID in /adminlogim:", req.sessionID);
    console.log("Session Data in /adminlogin:", req.session);

    return res.json({ success: true, message: 'Login successful' });
  });
});

// get admin first and last name
router.get('/admin/details', (req, res) => {
  // console.log("Session ID in /admin/details:", req.sessionID);
  // console.log("Session Data in /admin/details:", req.session);

  if (!req.session.adminID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  const { adminFname, adminNname } = req.session;

  if (!adminFname || !adminNname) {
    return res.status(400).json({ success: false, message: 'User details missing in session' });
  }

  return res.json({
    success: true,
    firstName: adminFname,
    lastName: adminNname
  });
});

// Fetch all users from the database
router.get('/usersList', (req, res) => {
  // console.log("Session ID in /usersList", req.sessionID);
  // console.log("Session Data in /usersList", req.session);
  // Ensure the admin is logged in
  if (!req.session.adminID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  // Query to fetch users from the database
  const qry = "SELECT userID, username, fname, lname, email, username, password FROM users";
  db.query(qry, (err, data) => {
    //console.log(data);
    if (err) {
      console.log("Database error: ", err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    //console.log(data);
    return res.json({ success: true, users: data });
  });
});

// In your backend route (e.g., `userRoutes.js`)

router.post('/user/create-account', (req, res) => {
  const { accountType, initialAmount } = req.body;
  const userID = req.session.userID; // Assuming the user is authenticated and their ID is in the session

  if (!userID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  if (!accountType || !initialAmount) {
    return res.status(400).json({ success: false, message: 'Account type and initial deposit are required' });
  }

  const balance = initialAmount; // Initial balance is the amount the user enters
  const bankingNum = Math.floor(Math.random() * 1000000000); // Random banking number (placeholder)
  const routingNum = Math.floor(Math.random() * 1000000000); // Random routing number (placeholder)

  // Insert the new account into the database
  const query = `
    INSERT INTO accounts (userID, type, balance, bankingNum, routingNum)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [userID, accountType, balance, bankingNum, routingNum], (err, results) => {
    if (err) {
      console.error('Error inserting account:', err);
      return res.status(500).json({ success: false, message: 'Error creating account' });
    }

    res.json({ success: true, message: `${accountType} account created successfully!` });
  });
});


router.put('/user/update-username', (req, res) => {
  // Ensure the user is logged in (either admin or the user themselves)
  if (!req.session.userID && !req.session.adminID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  const { newUsername } = req.body; // Assuming the new username is passed in the request body

  // Check if the new username is provided
  if (!newUsername) {
    return res.status(400).json({ success: false, message: 'New username is required' });
  }

  // Validate username format (optional, depending on your requirements)
  const usernameRegex = /^[a-zA-Z0-9_]+$/; // Simple alphanumeric and underscore check
  if (!usernameRegex.test(newUsername)) {
    return res.status(400).json({ success: false, message: 'Username can only contain letters, numbers, and underscores' });
  }

  // Check if the new username already exists in the database
  const checkUsernameQuery = "SELECT userID FROM users WHERE username = ?";
  db.query(checkUsernameQuery, [newUsername], (err, results) => {
    if (err) {
      console.log('Database error: ', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      // Username already taken
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }

    // Update the username in the database
    const updateUsernameQuery = "UPDATE users SET username = ? WHERE userID = ?";
    const userID = req.session.userID || req.session.adminID; // Use the logged-in user's ID

    db.query(updateUsernameQuery, [newUsername, userID], (err, updateResults) => {
      if (err) {
        console.log('Database error: ', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      // Successfully updated the username
      return res.json({ success: true, message: 'Username updated successfully' });
    });
  });
});

router.put('/user/change-password', (req, res) => {
  // Ensure the user is logged in (either admin or the user themselves)
  if (!req.session.userID && !req.session.adminID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  const { oldPassword, newPassword, confirmPassword } = req.body; // Extract data from the request body

  // Check if old password, new password, and confirm password are provided
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'Old password, new password, and confirm password are required' });
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'New passwords do not match' });
  }

  // Fetch the user's current password from the database
  const userID = req.session.userID || req.session.adminID; // Use the logged-in user's ID

  const getUserQuery = "SELECT password FROM users WHERE userID = ?";
  db.query(getUserQuery, [userID], (err, results) => {
    if (err) {
      console.log('Database error: ', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const currentPassword = results[0].password; // Retrieve current password from the database

    // Check if the old password matches the stored one
    if (oldPassword !== currentPassword) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    // Update the password in the database directly (without hashing)
    const updatePasswordQuery = "UPDATE users SET password = ? WHERE userID = ?";
    db.query(updatePasswordQuery, [newPassword, userID], (err, updateResults) => {
      if (err) {
        console.log('Database error: ', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      // Successfully updated the password
      return res.json({ success: true, message: 'Password updated successfully' });
    });
  });
});

router.put('/user/change-email', (req, res) => {
  // Ensure the user is logged in
  if (!req.session.userID && !req.session.adminID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  const { newEmail } = req.body;

  // Validate new email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(newEmail)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  // Check if the new email already exists in the database
  const checkEmailQuery = "SELECT userID FROM users WHERE email = ?";
  db.query(checkEmailQuery, [newEmail], (err, results) => {
    if (err) {
      console.log('Database error: ', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      // Email already exists
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Update the email in the database
    const userID = req.session.userID || req.session.adminID; // Use the logged-in user's ID

    const updateEmailQuery = "UPDATE users SET email = ? WHERE userID = ?";
    db.query(updateEmailQuery, [newEmail, userID], (err, updateResults) => {
      if (err) {
        console.log('Database error: ', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      return res.json({ success: true, message: 'Email updated successfully' });
    });
  });
});

router.put('/user/change-pin', (req, res) => {
  // Ensure the user is logged in
  if (!req.session.userID && !req.session.adminID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  const { currentPin, newPin } = req.body;

  // Ensure both currentPin and newPin are provided
  if (!currentPin || !newPin) {
    return res.status(400).json({ success: false, message: 'Current and new PIN are required' });
  }

  // Validate that the new PIN is different from the current PIN
  if (currentPin === newPin) {
    return res.status(400).json({ success: false, message: 'New PIN cannot be the same as the current PIN' });
  }

  // Check the current PIN in the database (hash it if needed)
  const checkPinQuery = "SELECT pin FROM userPins WHERE userID = ?";
  db.query(checkPinQuery, [req.session.userID], (err, results) => {
    if (err) {
      console.log('Database error: ', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0 || results[0].pin !== currentPin) {
      // Current PIN is incorrect
      return res.status(400).json({ success: false, message: 'Incorrect current PIN' });
    }

    // Update the PIN in the database (hash the new PIN if necessary)
    const updatePinQuery = "UPDATE userPins SET pin = ? WHERE userID = ?";
    db.query(updatePinQuery, [newPin, req.session.userID], (err, updateResults) => {
      if (err) {
        console.log('Database error: ', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      return res.json({ success: true, message: 'PIN updated successfully' });
    });
  });
});


// Fetch all users from the database
router.get('/accountsList', (req, res) => {
  // Ensure the user is logged in
  if (!req.session.adminID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  // Get user ID from the session
  const userID = req.session.userID;

  // Query to fetch accounts for the logged-in user only
  const qry = "SELECT * FROM accounts";
  
  db.query(qry, [userID], (err, data) => {
    if (err) {
      console.log("Database error: ", err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.json({ success: true, accounts: data });
  });
});

router.get('/transactionList', (req, res) => {
  // Ensure the user is logged in
  if (!req.session.adminID) {
    return res.status(401).json({ success: false, message: 'User not logged in' });
  }

  // Get user ID from the session
  const userID = req.session.userID;
  console.log("transactionList", userID);

  // Query to fetch accounts for the logged-in user only
  //const qry = "select * FROM transactionhistory INNER JOIN accounts GROUP BY userID WHERE userID = ? ORDER BY trasactionID DESC";
  const qry = 'SELECT * FROM transactionhistory INNER JOIN accounts ON transactionhistory.accountID = accounts.accountID GROUP BY transactionID';

  db.query(qry, [userID], (err, data) => {
    console.log(data);
    if (err) {
      console.log("Database error: ", err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    //  // If no transactions are found, return an empty array
    // if (!data || data.length === 0) {
    //   return res.json({ success: true, transactions: [] });
    // } 
    return res.json({ success: true, transactions: data });
  });
});


// get user first and last name
router.get('/user/details', (req, res) => {
  // console.log("Session ID in /user/details:", req.sessionID);
  // console.log("Session Data in /user/details:", req.session);

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

router.post('/admin/employee', async (req, res) => {
  // Destructure the request body to extract the data
  const { firstName, lastName, email, username, password } = req.body;

  // Validate the fields
  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Insert the new employee into the database (assuming you have a `employees` table)
  const query = `
    INSERT INTO bank.admin (username, password, fname, lname, email)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [username, password, firstName, lastName, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error adding new employee' });
    }

    // Respond with success
    return res.json({ success: true, message: 'Employee added successfully' });
  });
});


router.get('/admin/cemployees', (req, res) => {
  // Query that now includes 'adminID' as 'id'
  console.log("Session ID in /admin/cemployeess:", req.sessionID);
  console.log("Session Data in /admin/cemployees:", req.session);

  const qry = `SELECT * FROM admin`;

  db.query(qry, (err, data) => {
    //console.log(data);
    if (err) {
      console.log("Database error: ", err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.json({ success: true, employees: data });
  });

});




//GET BALANCE
// router.get('/balance/userBalance', (req, res) => {
//   console.log("Session ID in /balance:", req.sessionID);
//   console.log("Session Data in /balance:", req.session);

//   if (!req.session.userID) {
//     return res.status(401).json({ success: false, message: 'User not logged in' });
//   }

//   const qry = "SELECT balance FROM accounts WHERE userID = ?";

//   db.query(qry, [req.session.userID], (err, data) => {
//       if (err) {
//           console.error("Database error details:", err); // Log full error details
//           return res.json({ success: false, message: "Database error", error: err });
//       }

//       if (data.length === 0) {
//           return res.json({ success: false, message: "User not found" });
//       }
//       console.log(data)

//       return res.json({ 
//           success: true, 
//           balances: {
//               Checking: data[0]?.balance || 0, // Assuming the first entry is Checking
//               Savings: data[1]?.balance || 0   // Assuming the second entry is Savings
//           } 
//       });
//   });
// });

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
  //ADDED TRACK FOR ACTION TYPE AND ACCOUNTID (0 IS DEPOSIT, 1 IS WITHDRAW)
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

  //STRING TO QUERY TRANSACTION TO UPDATE
  const transactQry = "INSERT INTO transactionhistory (accountID, transactionType, amount, tracker) VALUES (?, ?, ?, CURDATE())";
  //STRING TO FIND ACCID
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