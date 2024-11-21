import { useState } from "react";
import { FileText, Send, DollarSign, PiggyBank } from "lucide-react";
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

export default function Component() {
  const [activeTab, setActiveTab] = useState("transactions");

  return (
    <div className="app-container">

      {/* Navigation Bar */}
      <NavBar/>

      {/* Account Overview */}
      <div className="card">
        <h1 className="card-title">Account Overview</h1>
        <p className="card-description">
          {accountDetails.accountType} - {accountDetails.accountNumber}
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
          <div className="tab-content">
            <h2>Pay Someone</h2>
            <p>E-pay functionality would be implemented here.</p>
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
  );
}
