import { useState } from "react";
import { FileText, Send, DollarSign, PiggyBank, CornerUpLeft, User} from "lucide-react";
import "./AccountPage.css"; 
import NavBar from "../components/NavBar";

// Mock data for account details and transactions
const accountDetails = {
  balance: 5000.75,
  accountType: "Checking",
  accountNumber: "**** **** **** 1234",
};

const transactions = [
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

  // This is for the hover and active portion of the logout button
  const [isLogoutHovered, setLogoutIsHovered] = useState(false);
  const [isLogoutActive, setLogoutIsActive] = useState(false);

  // For the side Nav bar to select accounts
  const [selectedAccount, setSelectedAccount] = useState<string>("Savings Account"); // BACKEND: Change to whatever first account pops up
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);

  // For pay tab
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [payAmount, setPayAmount] = useState<string>("");

  /*  
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
                onClick={() => setSelectedAccount(account)}
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
          <button className="user-button">
            <User style={{ marginRight: '0.5rem' }}/>
            Account
          </button>

          {/* Logout button portion */}
          <button 
            onMouseEnter={() => setLogoutIsHovered(true)}
            onMouseLeave={() => setLogoutIsHovered(false)}
            onMouseDown={() => setLogoutIsActive(true)}
            onMouseUp={() => setLogoutIsActive(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isLogoutHovered ? '#003459' : 'white', backgroundColor: isLogoutHovered ? "white" : "transparent",background: 'none', border: '1px solid white', borderRadius: '5px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', width: '125px', marginInline: 'auto', transition: 'background-color 0.4s ease, color 0.4s ease, 0.4s ease',transform: isLogoutActive ? 'scale(0.9)' : 'scale(1)'}}>
            <CornerUpLeft style={{ marginRight: '0.5rem' }} /> Logout
          </button>
        </div>
      </div>
      
      <div className="second-app-container">
        {/* Account Overview */}
        <div className="card">
          <h1 className="card-title">Account Overview</h1>
          <p className="card-description">

            {/* This portion here the variables are out of place since the first portion was hardcoded */}
            {selectedAccount} - {accountDetails.accountNumber}
          </p>
          <div className="balance">${accountDetails.balance.toFixed(2)}</div>
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
              <h2>Pay Someone</h2>
              <form className="pay-form">
                <input 
                  type='text' 
                  placeholder='Phone Number'
                  value={phoneNumber}
                  onChange={(e) => handleNumInputChange(e, setPhoneNumber)}
                  required
                />
                <input 
                  type='text' 
                  placeholder='Amount' 
                  value={payAmount}
                  onChange={(e) => handleNumInputChange(e, setPayAmount)}
                  required
                />
                <button type='submit'>Send</button>
              </form>
            </div>
          )}
          {activeTab === "deposit" && (
            <div className="tab-content">
              <h2>Deposit Check</h2>
              <p>Online check deposit functionality would be implemented here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
