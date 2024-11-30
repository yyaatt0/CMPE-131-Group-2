import { transaction } from "../types";
import { payment_confirm, lockout_warning, transaction_locked, pay_limit_reached, balance_warn } from "../textdescriptions";

import images from '../images';
import UserIcon from "../components/UserIcon";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FileText, Send, DollarSign, PiggyBank, CornerUpLeft, User} from "lucide-react";

// npm install react-phone-number-input --save (Make sure to install inside online-banking)
import PhoneInput, { isPossiblePhoneNumber, type Value } from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import { useEffect } from "react"; // Add this line for useEffect import

import "./AccountPage.css"; 
import PopupBox from "../components/PopupBox";
import ExpandableBtnList from "../components/ExpandableBtnList";

// Constants
const MIN_BALANCE: number = 0;
const PAYMENT_WARNING_PERCENTAGE: number = 0.1;
const PAYMENT_WARNING_MIN_BALANCE: number = 1000;
const PAYMENT_LIMIT: number = 2500;

// Mock data for account details and transactions
const accountDetails = {
  balance: 5000.75,
  accountType: "Checking",
  accountNumber: "**** **** **** 1234",
};

// BACKEND: This is a temporary hardcoded transaction list. Needs to be updated to grab list from database.
const transactions: transaction[] = [
  { id: 1, amount: -50.0, type: "Purchase", info: "Grocery Store", date: "2023-05-01" },
  { id: 2, amount: 1000.0, type: "Deposit", info: "Payroll", date: "2023-04-30" },
  // Add more transactions as needed...
];

// HARDCODED DATA 
// BACKEND
const accounts: string[] = ["Savings Account", "Checking Account"];

 // HARDCODED DATA
  // BACKEND: Fill this with the name associated with the account logged in
  const name = "John Doe";

export default function Component() {
  const [activeTab, setActiveTab] = useState("transactions");
  const [activeNavTab, setActiveNavTab] = useState("accounts");

  // This is for the hover and active portion of the logout button
  const [isLogoutHovered, setLogoutIsHovered] = useState(false);
  const [isLogoutActive, setLogoutIsActive] = useState(false);

  // For the side Nav bar to select accounts
  const [selectedAccount, setSelectedAccount] = useState<string>("Savings Account"); // BACKEND: Change to whatever first account pops up
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);

  // Balance display
  const [accountBalance, setAccountBalance] = useState<number>(accountDetails.balance); // BACKEND: Initial value here should be obtained from database

  // Set popup windows
  const [activePopup, setActivePopup] = useState('');

  // For pay tab
  const [phoneNumber, setPhoneNumber] = useState<Value>("" as Value);
  const [payAmount, setPayAmount] = useState<string>("");
  const [transactionLock, setTransactionLock] = useState(accountBalance <= 0);

  //For deposit 
  const [depositAmount, setDepositAmount] = useState<string>("");

  // State variables for file uploads (front/back of check)
  const [selectedFrontImg, setSelectedFrontImg] = useState<string | null>(null);
  const [selectedBackImg, setSelectedBackImg] = useState<string | null>(null);

  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<string | null>(null); 

  // This portion of the code is about the ACCOUNT SETTINGS
  const accountDataBtn: string[] = ["Change Username", "Change Password", "Change Email", "Change Pin"];
  const createAccBtn: string[] = ["Checking Account", "Savings Account"]; // Will only have these ones since they are easy
  const[settingBtn, setSettingBtn] = useState<string | null> (null);
  
  const handleSetting = (action: string) => {
    // I'll be using the activePopUp but will add additional case statements 
    setSettingBtn(action);
  };




  const handlePhoneNumber = (num: Value | undefined) => {
    
    if(num){
      setPhoneNumber(num);
    }

  }

  /*  
      FRONTEND: 
      
      General function to handle number-only text input 
        * Prereqs: setVal is a useState<string> function that has already been defined above
        * Example usage: 
                  <input 
                    type='text' 
                    placeholder='Enter amount'
                    value={amount}
                    onChange={(e) => handleNumInputChange(e, setAmount)}
                    required
                  />
  */
  const handleNumInputChange = (e: React.ChangeEvent<HTMLInputElement>, setVal: (val: string) => void) => {

    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setVal(value);
    }

  };

  /* 
    BACKEND:

      updateAccountBalance: Takes calculated new account balance and should update
                            the account balance in the database accordingly
      
      addNewTransaction:    Takes in a transaction, t, and pushes the information
                            to the transaction portion of the database. See
                            transaction type info in types.tsx for specifics on
                            what data the type holds.

  */
  const updateAccountBalance = (new_balance: number) => {

    /* Add function here to update balance on backend */
    setAccountBalance(new_balance); // Update account balance on frontend

  }
  const addNewTransaction = (t: transaction) => {

    /* Add function here to add a transaction to the database */
    /*  Make sure the transaction list is unique for each individual account, which is NOT done here */
    transactions.unshift(t); // *temporary* Updates temp transaction list on frontend

  }

  const validateBalance = (amount: number) => {

    if(amount > PAYMENT_LIMIT){
      setActivePopup('pay-limit-reached');
    }
    else if(accountBalance > PAYMENT_WARNING_MIN_BALANCE && amount > accountBalance * PAYMENT_WARNING_PERCENTAGE){
      setActivePopup('balance-warning')
    }
    else if(accountBalance - amount <= MIN_BALANCE){
      setActivePopup('lockout-warning');
    }
    else{
      setActivePopup('confirmation');
    }
  }

  const handlePayment = (phone: string, amount: number) => {

    if(!isPossiblePhoneNumber(phone)){
      setActivePopup('invalid-number');
      return;
    }

    setActivePopup('');
    updateAccountBalance(accountBalance - amount);

    const date = new Date();
    const payment: transaction = {
      id: 0,
      amount: -amount,
      type: 'Payment',
      info: `Payment to ${phone}`,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    addNewTransaction(payment);
    setActiveTab('transactions');

  }

  /* 
    FRONTEND:

      General function for rendering an error popup.
      Reqs: String is any error message you wish to display:
      Ex usage:
        renderErrorPopup('Invalid Input!');
  */
  const renderErrorPopup = (message: string) => {

    return (

      <PopupBox>
        <h2>Error</h2>
        <p>{message}</p>
        <div>
          <button onClick={() => setActivePopup('')}>Ok</button>
        </div>
      </PopupBox>

    );

  }

  /* 
    FRONTEND:

      General function for rendering a confirmation popup.
      Reqs: handleConfirm is a predefined function that returns void
      Ex usage:
        renderConfirmationPopup(() => handlePayment(phoneNumber, payAmount));
        renderConfirmationPopup(() => doSomething());

  */
  const renderConfirmationPopup = (handleConfirm: (params?: any) => void, heading?: string, text?: string) => {
    return (

      <PopupBox>
          <h2>{heading}</h2>
          <p>{text}</p>
          <div>
            <button onClick={() => setActivePopup('')}>Cancel</button>
            <button onClick={() => handleConfirm()}>Confirm</button>
          </div>
      </PopupBox>

    );
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Homepage');
  };

   // Reset deposit data when tab changes to something other than "deposit"
  useEffect(() => {
    if (activeTab !== 'deposit') {
      setDepositAmount(""); // Reset deposit amount
      setSelectedFrontImg(null); // Reset front image
      setSelectedBackImg(null); // Reset back image
    }
  }, [activeTab]);

  // Deposit function
  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0 || amount > 25000) {
      alert("Please enter a valid amount between 0 and 25000.");
    
      return;
    }
    if (!selectedFrontImg || !selectedBackImg) {
        alert("Please upload both front and back images of the check.");
        return;
  }
      // Confirmation dialog
  const confirmDeposit = window.confirm(
    `You are about to deposit $${amount.toFixed(2)} into your account. Do you want to continue?`
  );
  if (!confirmDeposit) {
    alert("Deposit canceled.");
    return;
  }
  // Update balance
  const newBalance = accountBalance + amount;
  updateAccountBalance(newBalance);

  // Add deposit transaction
  const date = new Date();
  const depositTransaction: transaction = {
    id: transactions.length + 1, // Increment transaction ID
    amount,
    type: "Deposit",
    info: "Check Deposit",
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
  };

  addNewTransaction(depositTransaction);

  // Reset deposit amount
  setDepositAmount("");
  setSelectedFrontImg(null);
  setSelectedBackImg(null); // Reset images after deposit

  alert(`The amount ${amount.toFixed(2)}  has been deposited into the account.`);
  };
  // Handle image file changes for front and back images
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') {
          setSelectedFrontImg(reader.result as string);
        } else {
          setSelectedBackImg(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  // Deposit confirmation function
  const handleConfirmDeposit = () => {
    if (amount && selectedFrontImg && selectedBackImg) {
      // Perform deposit confirmation action here
      console.log("Deposit confirmed with amount:", amount);
    } else {
      setError('Please fill out all fields correctly');
    }
  };

  return (
    <div className="app-container">

      {/* Navigation Bar */}
      {/* The div below will describe the nav bar on the lefthand side
      That Nav bar will consist of selecting the account, the name of the person, selecting accounts, and a logout button */}
      <div style={{ width: '160px', backgroundColor: '#003459', color: 'white', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <div>

          {/* There is a hardcoded name but later connect the backend to retrieve that data */}
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Welcome, {name}
          </h1>

          {/* Nav bar portion  */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {accounts.map((account) => (
              <button
                key={account}
                onClick={() => {setSelectedAccount(account); setActiveNavTab("accounts")}}
                onMouseEnter={() => setHoveredAccount(account)}
                onMouseLeave={() => setHoveredAccount(null)}
                style={{background: 'transparent', border: 'none', color: selectedAccount === account ? '#003459' : 'white',textAlign: 'left', padding: '1rem',fontSize: '1.2rem',cursor: 'pointer',borderRadius: '5px',transition: 'background-color 0.4s ease, color 0.4s ease',backgroundColor:
                    selectedAccount === account
                      ? 'white'
                      : hoveredAccount === account
                      ? '#809AAC' 
                      : 'transparent',             
                }}>
                {account}
              </button>
            ))}
          </nav>
        </div>

        <div className="button-wrapper">
          {/* Settings button */}
          <button className="user-button" onClick={() => setActiveNavTab("account_settings")}>
            <User style={{ marginRight: '0.5rem' }}/>
            Account
          </button>

          {/* Logout button portion */}
          <button 
            onClick={handleClick}
            onMouseEnter={() => setLogoutIsHovered(true)}
            onMouseLeave={() => setLogoutIsHovered(false)}
            onMouseDown={() => setLogoutIsActive(true)}
            onMouseUp={() => setLogoutIsActive(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isLogoutHovered ? '#003459' : 'white', backgroundColor: isLogoutHovered ? "white" : "transparent",background: 'none', border: '1px solid white', borderRadius: '5px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', width: '125px', marginInline: 'auto', transition: 'background-color 0.4s ease, color 0.4s ease, 0.4s ease',transform: isLogoutActive ? 'scale(0.9)' : 'scale(1)'}}>
            <CornerUpLeft style={{ marginRight: '0.5rem' }} /> Logout
          </button>
        </div>
      </div>
      
      {/* This seperate div is used to seperate the nav side bar stuff */}
      <div className="second-app-container">
        {activeNavTab === "accounts" && (
          <>
          {/* Account Overview */}
          <div className="card">
            <h1 className="card-title">Account Overview</h1>
            <p className="card-description">

              {/* This portion here the variables are out of place since the first portion was hardcoded */}
              {selectedAccount} - {accountDetails.accountNumber}
            </p>
            <div className="balance">${accountBalance.toFixed(2)}</div>
            <p className="balance-label">Available Balance</p>
          </div>

          {/* Navigation Tabs */}
          <div className="tabs-container">
            <button
              className={`tab-button ${activeTab === "transactions" ? "active" : ""}`}
              onClick={() => setActiveTab("transactions")}
            >
              <FileText className="icon" />
              Transactions
            </button>
            <button
              className={`tab-button ${activeTab === "transfer" ? "active" : ""}`}
              onClick={() => setActiveTab("transfer")}
            >
              <Send className="icon" />
              Transfer
            </button>
            <button
              className={`tab-button ${activeTab === "pay" ? "active" : ""}`}
              onClick={() => setActiveTab("pay")}
            >
              <DollarSign className="icon" />
              Pay
            </button>
            <button
              className={`tab-button ${activeTab === "deposit" ? "active" : ""}`}
              onClick={() => setActiveTab("deposit")}
            >
              <PiggyBank className="icon" />
              Deposit
            </button>
          </div>

          {/* Content Area */}
          <div className="content-area">
            {activeTab === "transactions" && (
              <div className="transactions">
                {transactions.map((transaction) => (
                  <div className="transaction-card" key={transaction.id}>
                    <div>
                      <div className="transaction-type">{transaction.type}</div>
                      <div className="transaction-info">{transaction.info}</div>
                      <div className="transaction-date">{transaction.date}</div>
                    </div>
                    <div
                      className={`transaction-amount ${
                        transaction.amount >= 0 ? "positive" : "negative"
                      }`}
                    >
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "transfer" && (
              <div className="tab-content">
                <h2>Transfer Funds</h2>
                <p>Transfer functionality would be implemented here.</p>
              </div>
            )}
            {activeTab === "pay" && (
            <div className="pay-content">
              <h2>Make a Payment</h2>
              <form 
                className="pay-form" 
                onSubmit={(e) => {
                  e.preventDefault();
                  transactionLock ? setActivePopup('locked') : validateBalance(Number(payAmount));
                }}
              >
                <PhoneInput 
                  type='text' 
                  placeholder='Phone Number'
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumber(e)}
                  required
                  className="PhoneSection"
                />
                <input 
                  type='text' 
                  placeholder={`Amount (Max: $${PAYMENT_LIMIT})`}
                  value={payAmount}
                  onChange={(e) => handleNumInputChange(e, setPayAmount)}
                  required
                />
                <button type='submit'>Send</button>
              </form>
              {activePopup === 'confirmation' && 
                renderConfirmationPopup(
                  () => handlePayment(phoneNumber, Number(payAmount)), 
                  'Please confirm.', 
                  payment_confirm
                )
              }
              {activePopup === 'balance-warning' &&
                renderConfirmationPopup(
                  () => setActivePopup('confirmation'),
                  'Are you sure?',
                  balance_warn
                )
              }
              {activePopup === 'lockout-warning' && 
                renderConfirmationPopup(
                  () => {
                    handlePayment(phoneNumber, Number(payAmount))
                    setTransactionLock(true);
                  }, 
                  'Warning!', 
                  lockout_warning
                )
              }
              {activePopup === 'invalid-number' &&
               renderErrorPopup('Invalid phone number. Please try again.')
              }
              {activePopup === 'locked' &&
                renderErrorPopup(transaction_locked)
              }
              {activePopup === 'pay-limit-reached' &&
                renderErrorPopup(pay_limit_reached)
              }
            </div>
          )}
            {activeTab === "deposit" && (
              <div className="tab-content">
          
    <h2>Deposit Check</h2>
    
    {/* Upload Front and Back of Check */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      
      {/* Front of Check */}
      <div style={{ textAlign: 'center' }}>
        <h3>Upload Front of Check</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'front')}
        />
        {selectedFrontImg && (
          <div>
            <h4>Front of Check</h4>
            <img
              src={selectedFrontImg}
              alt="Front of check"
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>

      {/* Back of Check */}
      <div style={{ textAlign: 'center' }}>
        <h3>Upload Back of Check</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'back')}
        />
        {selectedBackImg && (
          <div>
            <h4>Back of Check</h4>
            <img
              src={selectedBackImg}
              alt="Back of check"
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    </div>

    {/* Deposit Amount Input */}
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3>Enter Deposit Amount</h3>
      <input
        type="number"
        placeholder="Enter amount"
        value={depositAmount}
        onChange={(e) => handleNumInputChange(e, setDepositAmount)}
        className="amount-input"
        style={{ padding: '10px', width: '200px', fontSize: '16px' }}
      />
    </div>

    {/* Error Display */}
    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

    {/* Confirm Deposit Button */}
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        onClick={handleDeposit}

        className="deposit-btn"
        style={{
          backgroundColor: '#003459',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
       Confirm Deposit
      </button>
      
    </div>
</div>
)}
</div>
        </>
        )}
        {activeNavTab === "account_settings" && (
          <>
            {/* Making all the buttons seperate to hopefully make integration easier  */}
            <div className="screen-card"> 
              <h1 className="card-title">Account Profile & Settings</h1>
              <div className="info-wrapper">
                <UserIcon src={images.user_icon}/>
                <br/>
                {/* This will be their username/email; using a name placeholder for now */}
                <h1 className="card-title">@{name}</h1>
              </div>
              <div className="tab-btn"> 
                <ExpandableBtnList trigger="Create an Account" buttons={createAccBtn} onButtonClick={handleSetting}/>
                <ExpandableBtnList trigger="Account Data" buttons={accountDataBtn} onButtonClick={handleSetting}/>
              </div>
            </div>
            {settingBtn === "Checking Account" && (
              <>
                <PopupBox>
                  <h2>Make Checking Account</h2>
                  <p>Make Checking Account</p>
                </PopupBox>
              </>
            )}
            {settingBtn === "Savings Account" && (
              <>
                <PopupBox>
                  <h2>Make Savings Account</h2>
                  <p>Make Savings Account</p>
                </PopupBox>
              </>
            )}
            {settingBtn === "Change Username" && (
              <>
                <PopupBox>
                  <h2>Change Username</h2>
                  <p>Change Username</p>
                </PopupBox>
              </>
            )}
            {settingBtn === "Change Password" && (
              <>
                <PopupBox>
                  <h2>Change Password</h2>
                  <p>Change Password</p>
                </PopupBox>
              </>
            )}
            {settingBtn === "Change Email" && (
              <>
                <PopupBox>
                  <h2>Change Email</h2>
                  <p>Change Email</p>
                </PopupBox>
              </>
            )}
            {settingBtn === "Change Pin" && (
              <>
                <PopupBox>
                  <h2>Change Pin</h2>
                  <h2>Change Pin</h2>
                </PopupBox>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
