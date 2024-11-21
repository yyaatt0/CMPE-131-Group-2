-- Create the bank schema
CREATE SCHEMA IF NOT EXISTS bank;

-- Create tables within the bank schema
CREATE TABLE bank.admin (
    adminID INT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL
);

CREATE TABLE bank.users (
    userID INT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL,
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE bank.accounts (
    accountID INT PRIMARY KEY,
    userID INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    balance FLOAT DEFAULT 0.0,
    bankingNum INT NOT NULL,
    routingNum INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES bank.users(userID)
);

CREATE TABLE bank.transactionHistory (
    transactionID INT PRIMARY KEY,
    accountID INT NOT NULL,
    transactionType BOOLEAN NOT NULL,  -- 0 for debit, 1 for credit
    amount FLOAT NOT NULL,
    timeCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tracker DATE NOT NULL,
    FOREIGN KEY (accountID) REFERENCES bank.accounts(accountID)
);

CREATE TABLE bank.userPins (
    userID INT PRIMARY KEY,
    pin VARCHAR(4) NOT NULL,
    FOREIGN KEY (userID) REFERENCES bank.users(userID)
);

INSERT INTO bank.users (userID, username, password, fname, lname, email) VALUES
(1, 'jdoe', 'password123', 'John', 'Doe', 'jdoe@example.com'),
(2, 'asmith', 'securePass!45', 'Alice', 'Smith', 'asmith@example.com'),
(3, 'bwayne', 'batmanForever', 'Bruce', 'Wayne', 'bwayne@example.com');

INSERT INTO bank.userPins (userID, pin) VALUES
(1, '1234'),
(2, '1234'),
(3, '1234');

INSERT INTO bank.accounts (accountID, userID, type, balance, bankingNum, routingNum) VALUES
(1, 1, 'Checking', 5000.00, 123456789, 987654321),  -- John Doe's checking account
(2, 1, 'Savings', 10000.00, 234567890, 876543210),  -- John Doe's savings account
(3, 2, 'Checking', 3000.00, 345678901, 765432109),  -- Alice Smith's checking account
(4, 2, 'Savings', 5000.00, 456789012, 654321098),  -- Alice Smith's savings account
(5, 3, 'Checking', 0.00, 567890123, 543210987),  -- Bruce Wayne's checking account
(6, 3, 'Savings', 15000.00, 678901234, 432109876);  -- Bruce Wayne's savings account

-- Insert transaction history for John Doe (userID 1)
INSERT INTO bank.transactionHistory (transactionID, accountID, transactionType, amount, timeCreate, tracker) VALUES
(1, 1, 0, 200.00, '2024-11-01 10:00:00', '2024-11-01'),  -- Debit from John's checking account
(2, 1, 1, 500.00, '2024-11-02 14:30:00', '2024-11-02'),  -- Credit to John's checking account
(3, 2, 0, 100.00, '2024-11-03 09:45:00', '2024-11-03'),  -- Debit from John's savings account
(4, 2, 1, 300.00, '2024-11-04 11:00:00', '2024-11-04');  -- Credit to John's savings account

-- Insert transaction history for Alice Smith (userID 2)
INSERT INTO bank.transactionHistory (transactionID, accountID, transactionType, amount, timeCreate, tracker) VALUES
(5, 3, 0, 50.00, '2024-11-05 12:30:00', '2024-11-05'),  -- Debit from Alice's checking account
(6, 3, 1, 200.00, '2024-11-06 16:00:00', '2024-11-06'),  -- Credit to Alice's checking account
(7, 4, 0, 150.00, '2024-11-07 08:15:00', '2024-11-07'),  -- Debit from Alice's savings account
(8, 4, 1, 400.00, '2024-11-08 17:45:00', '2024-11-08');  -- Credit to Alice's savings account

-- Insert transaction history for Bruce Wayne (userID 3)
INSERT INTO bank.transactionHistory (transactionID, accountID, transactionType, amount, timeCreate, tracker) VALUES
(9, 5, 0, 100.00, '2024-11-09 13:00:00', '2024-11-09'),  -- Debit from Bruce's checking account
(10, 5, 1, 1000.00, '2024-11-10 19:30:00', '2024-11-10'),  -- Credit to Bruce's checking account
(11, 6, 0, 500.00, '2024-11-11 07:45:00', '2024-11-11'),  -- Debit from Bruce's savings account
(12, 6, 1, 2000.00, '2024-11-12 18:00:00', '2024-11-12');  -- Credit to Bruce's savings account


