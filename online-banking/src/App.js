import React, { useState } from "react";
import { CornerUpLeft } from "lucide-react"; // Assuming you are still using this icon library
import './App.css';

export default function App() {
  const [selectedAccount, setSelectedAccount] = useState("Savings Account");

  const accounts = ["Savings Account", "Checking Account"];

  return (
    <div className="container">
      <div className="navigation">
        <div className="nav-header">
          <h1>Welcome, John Doe</h1>
          <nav>
            {accounts.map((account) => (
              <button
                key={account}
                className={`account-button ${
                  selectedAccount === account ? "active" : ""
                }`}
                onClick={() => setSelectedAccount(account)}
              >
                {account}
              </button>
            ))}
          </nav>
        </div>
        <button className="logout-button">
            <CornerUpLeft className="icon" /> Logout
          </button>
      </div>

      <div className="content">
        <h2>{selectedAccount}</h2>
        <div className="card-grid">
          <div className="card">
            <button className="card-button">Withdraw Cash</button>
          </div>
          <div className="card">
            <button className="card-button">Fund Transfer</button>
          </div>
          <div className="card">
            <button className="card-button">Deposit Cash</button>
          </div>
          <div className="card">
            <button className="card-button">Deposit Check</button>
          </div>
          <div className="card wide">
            <button className="card-button">View Transactions</button>
          </div>
        </div>
      </div>

      <div className="balance">
        <h1>Balance</h1>
        <h2>$0.00</h2>
      </div>
    </div>
  );
}