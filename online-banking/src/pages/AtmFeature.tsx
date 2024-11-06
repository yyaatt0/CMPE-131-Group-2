import { useState } from "react";
// the cmd line to install this is 
// npm install lucide-react
// This package is for the icons used in this page
import { CornerUpLeft, X } from "lucide-react"; 
import { useResolvedPath } from "react-router-dom";

// This will be used as a reference to associate the account type and the balance associated with it
interface AccountBalance {
  [key: string]: number;
}

const AtmFeature = () => {
  // For the side Nav bar to select accounts
  const [selectedAccount, setSelectedAccount] = useState<string>("Savings Account"); // BACKEND: Change to whatever first account pops up
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);

  // List of accounts
  // BACKEND: Fill this array from the data base based on what account the user has 
  const accounts: string[] = ["Savings Account", "Checking Account"];
  
  // This is for the hover and active portion of the logout button
  const [isLogoutHovered, setLogoutIsHovered] = useState(false);
  const [isLogoutActive, setLogoutIsActive] = useState(false);

  // This is for the hover and active for portion of a button in the grid
  const actions = ['Withdraw Cash', 'Fund Transfer', 'Deposit Cash', 'Deposit Check', 'View Transactions'];
  const [isActionBtnHovered, setActionBtnHovered] = useState<number | null>(null);
  const [isActionBtnActive, setActionBtnActive] = useState<number | null>(null);


  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  
  // HARDCODED DATA
  // BACKEND: Import the data from the database into this format: account type and balance
  const [balance, setBalances] = useState<AccountBalance>({
    "Savings Account": 1000,
    "Checking Account": 500,
  });
 
  // HARDCODED DATA
  // BACKEND: Import the list of transaction into an list
  // Right now, when the first user uses the atm, the balance transaction list is empty
  const [transaction, setTransactions] = useState<{ [key: string]: string[] }> ({
    "Savings Account": [],
    "Checking Account": [],
  });
  
  // This is for the transfer fund portion of the ATM feature 
  // Right now you can type whoever name you want to transfer and it will work
  // Later I should add transfer balance between accounts
  // When sending to another person, we need backend to confirm whoever email is typed is in the database
  // Afterwards, we will get the full name of the account and confirm 
  const [transferConfirmation, setTransferConfirmation] = useState<boolean>(false);
  const [transferRecipient, setTransferRecipient] = useState<string>("");  



  const handleActionClick = (action: string) => {
    setActivePopup(action);
    setAmount("");
    setTransferConfirmation(false);
    setTransferRecipient("");
  };

  const handleNumpadClick = (value: string) => {
    if (value === "." && amount.includes(".")) return;
    if (value === "." && amount === "") {
      setAmount("0.");
    } else {
      setAmount(prev => prev + value);
    }
  };

  // Backend code that helps deal with the action features
  const handleConfirm = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return;

    switch (activePopup) {
      case "Withdraw Cash":
        if (amountNum <= balance[selectedAccount]) {
          setBalances(prev => ({
            ...prev,
            [selectedAccount]: prev[selectedAccount] - amountNum
          }));
          setTransactions(prev => ({
            ...prev,
            [selectedAccount]: [`Withdrawn $${amountNum}`, ...prev[selectedAccount]]
          }));
        }
        setActivePopup(null);
        break;
      case "Deposit Cash":
      case "Deposit Check":
        setBalances(prev => ({
          ...prev,
          [selectedAccount]: prev[selectedAccount] + amountNum
        }));
        setTransactions(prev => ({
          ...prev,
          [selectedAccount]: [`Deposited $${amountNum}`, ...prev[selectedAccount]]
        }));
        setActivePopup(null);
        break;
      case "Fund Transfer":
        if (!transferConfirmation) {
          setTransferConfirmation(true);
        } else if (amountNum <= balance[selectedAccount]) {
          setBalances(prev => ({
            ...prev,
            [selectedAccount]: prev[selectedAccount] - amountNum,
            [transferRecipient]: prev[transferRecipient] + amountNum
          }));
          setTransactions(prev => ({
            ...prev,
            [selectedAccount]: [`Transferred $${amountNum} to ${transferRecipient}`, ...prev[selectedAccount]],
            [transferRecipient]: [`Received $${amountNum} from ${selectedAccount}`, ...prev[transferRecipient]]
          }));
          setActivePopup(null);
        }
        break;
    }
  };

  const renderPopup = () => {
    if (!activePopup) return null;

    let popupContent;
    switch (activePopup) {
      case "Withdraw Cash":
      case "Deposit Cash":
        popupContent = (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{activePopup}</h2>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={amount}
                readOnly
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  textAlign: 'right',
                  fontSize: '1.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.375rem'
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "C"].map((num) => (
                <button
                  key={num}
                  onClick={() => num === "C" ? setAmount("") : handleNumpadClick(num.toString())}
                  style={{
                    padding: '1rem',
                    fontSize: '1.25rem',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    // ':hover': { backgroundColor: '#d1d5db' }
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              onClick={handleConfirm}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                // ':hover': { backgroundColor: '#2563eb' }
              }}
            >
              Confirm
            </button>
          </>
        );
        break;
      case "Fund Transfer":
        popupContent = (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Fund Transfer</h2>
            {!transferConfirmation ? (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    value={amount}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      textAlign: 'right',
                      fontSize: '1.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '0.375rem'
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "C"].map((num) => (
                    <button
                      key={num}
                      onClick={() => num === "C" ? setAmount("") : handleNumpadClick(num.toString())}
                      style={{
                        padding: '1rem',
                        fontSize: '1.25rem',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        // ':hover': { backgroundColor: '#d1d5db' }
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <select
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '0.375rem'
                    }}
                  >
                    <option value="">Select recipient account</option>
                    {accounts.filter(account => account !== selectedAccount).map(account => (
                      <option key={account} value={account}>{account}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleConfirm}
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    // ':hover': { backgroundColor: '#2563eb' }
                  }}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                  Are you sure you want to transfer ${amount} from {selectedAccount} to {transferRecipient}?
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setTransferConfirmation(false)}
                    style={{
                      width: '48%',
                      padding: '0.5rem',
                      backgroundColor: '#d1d5db',
                      color: '#1f2937',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      // ':hover': { backgroundColor: '#9ca3af' }
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    style={{
                      width: '48%',
                      padding: '0.5rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      // ':hover': { backgroundColor: '#2563eb' }
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </>
        );
        break;
      case "Deposit Check":
        popupContent = (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Deposit Check</h2>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="file"
                accept="image/*"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.375rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="number"
                placeholder="Enter check amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.375rem'
                }}
              />
            </div>
            <button
              onClick={handleConfirm}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                // ':hover': { backgroundColor: '#2563eb' }
              }}
            >
              Deposit Check
            </button>
          </>
        );
        break;
      case "View Transactions":
        popupContent = (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Recent Transactions</h2>
            <ul style={{ maxHeight: '16rem', overflowY: 'auto' }}>
              {transaction[selectedAccount].map((transaction, index) => (
                <li key={index} style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>{transaction}</li>
              ))}
            </ul>
          </>
        );
        break;
    }

    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          width: '24rem',
          position: 'relative'
        }}>
          <button
            onClick={() => setActivePopup(null)}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              backgroundColor: '#d1d5db',
              color: '#1f2937',
              borderRadius: '0.375rem',
              padding: '0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              // ':hover': { backgroundColor: '#9ca3af' }
            }}
          >
            X
          </button>
          {popupContent}
        </div>
      </div>
    );
  };

  return (
    // The div below describes basic body style
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', overflow: 'hidden', fontFamily: 'sans-serif', background: '#e2e2e2' }}>

      {/* The div below will describe the nav bar on the lefthand side
      That Nav bar will consist of selecting the account, the name of the person, selecting accounts, and a logout button */}
      <div style={{ width: '33%', backgroundColor: '#003459', color: 'white', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <div>

          {/* There is a hardcoded name but later connect the backend to retrieve that data */}
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Welcome, John Doe
          </h1>

          {/* Nav bar portion  */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {accounts.map((account) => (
              <button
                key={account}

                onClick={() => setSelectedAccount(account)}
                onMouseEnter={() => setHoveredAccount(account)}
                onMouseLeave={() => setHoveredAccount(null)}

                style={{
                  background: 'transparent',
                  border: 'none',
                  color: selectedAccount === account ? '#003459' : 'white',
                  textAlign: 'left',
                  padding: '1rem',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  transition: 'background-color 0.4s ease, color 0.4s ease',
                  backgroundColor:
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

        {/* Logout button portion */}
        <button 

          onMouseEnter={() => setLogoutIsHovered(true)}
          onMouseLeave={() => setLogoutIsHovered(false)}
          onMouseDown={() => setLogoutIsActive(true)}
          onMouseUp={() => setLogoutIsActive(false)}

          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: isLogoutHovered ? '#003459' : 'white', 
            backgroundColor: isLogoutHovered ? "white" : "transparent",
            background: 'none', 
            border: '1px solid white', 
            borderRadius: '5px', 
            padding: '0.5rem 1rem', 
            cursor: 'pointer', 
            fontSize: '18px', 
            fontWeight: 'bold', 
            width: '125px', 
            transition: 'background-color 0.4s ease, color 0.4s ease, 0.4s ease',
            transform: isLogoutActive ? 'scale(0.9)' : 'scale(1)'
            }}>

          <CornerUpLeft style={{ marginRight: '0.5rem' }} /> Logout
        </button>
      </div>

      {/* This div contains holding the button features*/}
      <div style={{ padding: '2rem', width: '67%', overflowY: 'auto', marginRight: '1rem' }}>

        {/* Header to display what accout is selected */}
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{selectedAccount}</h2>

        {/* This is the div grid that allows the user to select which feature to choose from */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          {actions.map((action, index) => (
            <div

              //onMouseDown={() => (document.activeElement as HTMLElement).blur()}
              onClick={() => handleActionClick(action)}
              key={action}

              onMouseEnter={() => setActionBtnHovered(index)}
              onMouseLeave={() => setActionBtnHovered(null)}
              onMouseDown={() => setActionBtnActive(index)}
              onMouseUp={() => setActionBtnActive(null)}

              style={{
                padding: '2vw',
                backgroundColor: 'white',
                borderRadius: '8px',
                transition: isActionBtnHovered === index ? 'box-shadow 0.3s, transform 0.4s ease' : "none",
                transform: isActionBtnActive === index ? 'scale(0.95)' : 'scale(1)',
                cursor: 'pointer',
                gridColumn: action === 'View Transactions' ? 'span 2' : 'auto',
              }}>

              <button 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  padding: '1.5rem', 
                  background: 'none', 
                  border: '1px solid #003459', 
                  fontSize: 'calc(0.5rem + 0.5vw)', 
                  cursor: 'pointer' 
                  }}>
                {action}
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* The div below is the ones that display the current balance of the account */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '2rem ', backgroundColor: 'transparent' }}>
        <h1 style={{ fontWeight: 'bold', paddingLeft: '2rem', paddingRight: '2rem', fontSize: 'calc(1.5rem + 2vw)' }}>
          Balance
        </h1>
        <h2 style={{ paddingTop: '2rem', fontSize: 'calc(1rem + 1vw)', fontWeight: 'bold' }}>
         ${balance[selectedAccount].toFixed(2)}
        </h2>
      </div>

      {renderPopup()}
    </div>
  );
}

export default AtmFeature;
