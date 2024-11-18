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
    pin VARCHAR(6) NOT NULL,
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

INSERT INTO bank.users (userID, username, password, fname, lname, email) VALUES
(1, 'jdoe', 'password123', 'John', 'Doe', 'jdoe@example.com'),
(2, 'asmith', 'securePass!45', 'Alice', 'Smith', 'asmith@example.com'),
(3, 'bwayne', 'batmanForever', 'Bruce', 'Wayne', 'bwayne@example.com');

