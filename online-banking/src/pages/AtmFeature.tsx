import { useState, useEffect } from "react";
// the cmd line to install this is 
// npm install lucide-react
// This package is for the icons used in this page
import { CornerUpLeft, X } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

// This will be used as a reference to associate the account type and the balance associated with it
interface AccountBalance {
  [key: string]: number;
}

const AtmFeature = () => {
  // For the side Nav bar to select accounts
  const [selectedAccount, setSelectedAccount] = useState<string>("Savings Account"); // BACKEND: Change to whatever first account pops up
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);
  
  // This is for the hover and active portion of the logout button
  const [isLogoutHovered, setLogoutIsHovered] = useState(false);
  const [isLogoutActive, setLogoutIsActive] = useState(false);

  // This is for the hover and active for portion of a button in the grid
  const actions = ['Withdraw Cash', 'Fund Transfer', 'Deposit Cash', 'Deposit Check', 'View Transactions'];
  const [isActionBtnHovered, setActionBtnHovered] = useState<number | null>(null);
  const [isActionBtnActive, setActionBtnActive] = useState<number | null>(null);

  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  
  // This is used for the numpad on the popup display
  const [isNumpadHover, setNumpadHover] = useState<string | number | null>(null);
  const [isNumpadActive, setNumpadActive] = useState<string | number | null>(null);

  // This is for the confirm buttons in the popup 
  const [isConfirmHover, setConfirmHover] = useState(false);
  const [isConfirmActive, setConfirmActive] = useState(false);

  // This is for the buttons on the fund transfer
  const [isFundConfirmHover, setFundConfirmHover] = useState(false);
  const [isFundCancelHover, setFundCancelHover] = useState(false);

  // This is for showing a preview of the check images
  const [selectedFrontImg, setSelectedFrontImg] = useState<string>();
  const [selectedBackImg, setSelectedBackImg] = useState<string>();


  // The logout redirect
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/AtmLogin');
  };

  // HARDCODED DATA
  // BACKEND: Import the data from the database into this format: account type and balance
  const [balance, setBalances] = useState<AccountBalance>({
    "Savings Account": 1000,
    "Checking Account": 500,
  });

  // HARDCODED DATA
  // BACKEND: Fill this array from the data base based on what account the user has 
  const accounts: string[] = ["Savings Account", "Checking Account"];

  // HARDCODED DATA
  // BACKEND: Fill this with the name associated with the account logged in
  const name = "John Doe";
 
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
  const [transferError, setTransferError] = useState<string>("");


  // Function to say if one of the feature buttons is clicked, therefore, display the popup window
  const handleActionClick = (action: string) => {
    setActivePopup(action);
    setAmount("");
    setTransferConfirmation(false);
    setTransferRecipient("");
    setTransferError("");
  };

  // Input handling for the textbox
  const handleNumpadClick = (value: string) => {
    if (value === "C") {
      setAmount("");
      return;
    }
    
    if (value === "." && amount.includes(".")) return;
    
    let newAmount = amount + value;
    const parts = newAmount.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
      return; // Don't add more than 2 decimal places
    }
    
    if (newAmount === ".") {
      newAmount = "0.";
    }
    
    setAmount(newAmount);
  };

  // Filtering out inputs that we don't want
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  // BACKEND 
  // When the confirmed button is pressed, it will update the following LOCAL variables: TRANSACTION LIST AND CURRENT BALANCE
  // Each switch statement corresponds to the feature that is active at the moment
  const handleConfirm = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return;

    switch (activePopup) {

      // WITHDRAW
      case "Withdraw Cash":
        if (amountNum <= balance[selectedAccount]) {
          setBalances(prev => ({
            ...prev,
            [selectedAccount]: prev[selectedAccount] - amountNum
          }));
          setTransactions(prev => ({
            ...prev,
            [selectedAccount]: [`Withdrawn $${amountNum.toFixed(2)}`, ...prev[selectedAccount]]
          }));
        }
        setActivePopup(null);
        break;

      // DEPOSIT (same for cash/check)
      case "Deposit Cash":
      case "Deposit Check":
        setBalances(prev => ({
          ...prev,
          [selectedAccount]: prev[selectedAccount] + amountNum
        }));
        setTransactions(prev => ({
          ...prev,
          [selectedAccount]: [`Deposited $${amountNum.toFixed(2)}`, ...prev[selectedAccount]]
        }));
        setActivePopup(null);
        break;
      
      // FUND TRANSFER
      case "Fund Transfer":
        if (!transferConfirmation) {
          if (transferRecipient) {
            setTransferConfirmation(true);
            setTransferError("");
          } else {
            setTransferError("Please select a recipient account");
          }
        } else if (amountNum <= balance[selectedAccount]) {
          setBalances(prev => ({
            ...prev,
            [selectedAccount]: prev[selectedAccount] - amountNum,
            [transferRecipient]: prev[transferRecipient] + amountNum
          }));
          setTransactions(prev => ({
            ...prev,
            [selectedAccount]: [`Transferred $${amountNum.toFixed(2)} to ${transferRecipient}`, ...prev[selectedAccount]],
            [transferRecipient]: [`Received $${amountNum.toFixed(2)} from ${selectedAccount}`, ...prev[transferRecipient]]
          }));
          setActivePopup(null);
        }
        break;
    }
  };

  // This function is meant for the UI
  useEffect(() => {
    switch(activePopup){
      case "Withdraw Cash":
      case "Deposit Cash":
      case "Deposit Check":
      case "Fund Transfer":
        setConfirmHover(false);
        break;
    }
  }, [activePopup]);

  // This function shows up the pop up and with the UI content
  const renderPopup = () => {
    if (!activePopup) return null;

    let popupContent;
    switch (activePopup) {

      // The popup for "Withdraw Cash" and "Deposit Cash" are the same
      case "Withdraw Cash":
      case "Deposit Cash":
        popupContent = (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{activePopup}</h2>
            
            {/* This is the textbox where we enter the amount */}
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                readOnly
                style={{width: '95%', height: '40px', padding: '0.5rem', textAlign: 'right', fontSize: '1.5rem', borderRadius: '0.375rem', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', backgroundColor: 'white', color: 'black',}}
              />
            </div>

            {/* This is the numpad portion */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "C"].map((num) => (
                <button
                  key={num}
                  // onClick={() => num === "C" ? setAmount("") : handleNumpadClick(num.toString())}
                  onClick={() => handleNumpadClick(num.toString())}
                  onMouseEnter={() => setNumpadHover(num)}
                  onMouseLeave={() => setNumpadHover(null)}
                  onMouseDown={() => setNumpadActive(num)}
                  onMouseUp={() => setNumpadActive(null)}
                  style={{padding: '1rem', fontSize: '1.25rem', backgroundColor: isNumpadHover === num ? '#cbd5e1' : '#d1d5db', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', transition: 'background-color 0.5s, transform 0.4s ease', transform: isNumpadActive === num ? 'scale(0.95)' : 'scale(1)', color: 'black',}}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* The confirm button */}
            <button
              onClick={handleConfirm}
              onMouseDown={() => setConfirmActive(true)}
              onMouseUp={() => setConfirmActive(false)}
              onMouseEnter={() => setConfirmHover(true)}
              onMouseLeave={() => setConfirmHover(false)}
              style={{marginTop: '1rem', width: '100%', height: '50px', padding: '0.5rem', backgroundColor: isConfirmHover ? '#00171F' : '#003459', color: 'white', borderRadius: '0.375rem', fontSize: '1.25rem', border: 'none', cursor: 'pointer', transition: 'background-color 0.5s, transform 0.4s ease', transform: isConfirmActive ? 'scale(0.95)' : 'scale(1)',}}
            >
              Confirm
            </button>
          </>
        );
        break;
      // Pop up for Fund Transfer
      case "Fund Transfer":
        popupContent = (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Fund Transfer</h2>

            {/* This boolean handles if the "Next" button has been clicked or not.
            Therefore, if the button has been clicked, it will prompt the seperate
            confirmation popup to confirm the fund transfer.
            If not, it will pop up the normal popup to choose which account to transfer money to
            and how much money.  */}
            {!transferConfirmation ? (
              <>
                {/* This is the textbox where we enter the amount */}
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    value={amount}
                    placeholder="0.00"
                    // readOnly
                    onChange={handleAmountChange}
                    style={{width: '95%', height: '40px', padding: '0.5rem', textAlign: 'right', fontSize: '1.5rem', borderRadius: '0.375rem', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', backgroundColor: 'white', color: 'black',}}
                  />
                </div>

                {/* This is the selecting the recipient */}
                <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  <select

                    // This portion hold variables for the transfer reciepient (only between accounts)
                    // Also sets the variable for the selected account that will be used later
                    value={transferRecipient}
                    onChange={(e) => {
                      setTransferRecipient(e.target.value);
                      setTransferError("");
                    }}
                    style={{width: '100%', height: '50px', fontSize: '15px', paddingLeft: '10px',border: '1px solid #ccc',borderRadius: '0.375rem',backgroundColor: 'white',color: 'black',borderColor: transferError ? 'red' : 'gray',}}
                  >

                    {/* Drop down box to select an account  */}
                    <option value="">Select recipient account</option>
                    {accounts.filter(account => account !== selectedAccount).map(account => (
                      <option key={account} value={account}>{account}</option>
                    ))}
                  </select>

                  {/* This says if there is no account selected, and the is some amount enter, prompt an error   */}
                  {transferError && (<p style={{color: 'red', fontSize: '15px'}}>{transferError}</p>)}
                </div>

                {/* This is the numpad */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "C"].map((num) => (
                    <button
                      key={num}
                      // onClick={() => num === "C" ? setAmount("") : handleNumpadClick(num.toString())}
                      onClick={() => handleNumpadClick(num.toString())}
                      onMouseEnter={() => setNumpadHover(num)}
                      onMouseLeave={() => setNumpadHover(null)}
                      onMouseDown={() => setNumpadActive(num)}
                      onMouseUp={() => setNumpadActive(null)}
                      style={{padding: '1rem',fontSize: '1.25rem',backgroundColor: isNumpadHover === num ? '#cbd5e1' : '#d1d5db',borderRadius: '0.375rem',border: 'none',cursor: 'pointer',transition: 'background-color 0.5s, transform 0.4s ease',transform: isNumpadActive === num ? 'scale(0.95)' : 'scale(1)',color: 'black',}}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* This is the next button  */}
                <button
                  onClick={() => {handleConfirm(); setConfirmHover(false)}}
                  onMouseDown={() => setConfirmActive(true)}
                  onMouseUp={() => setConfirmActive(false)}
                  onMouseEnter={() => setConfirmHover(true)}
                  onMouseLeave={() => setConfirmHover(false)}
                  style={{marginTop: '1rem',width: '100%',height: '50px',padding: '0.5rem',backgroundColor: isConfirmHover ? '#00171F' : '#003459',color: 'white',borderRadius: '0.375rem',fontSize: '1.25rem',border: 'none',cursor: 'pointer',transition: 'background-color 0.3s, transform 0.4s ease',transform: isConfirmActive ? 'scale(0.95)' : 'scale(1)',}}
                >
                  Next
                </button>
              </>
            ) : (

              // This is when the "Next" button has been clicked
              <>
                <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                  Are you sure you want to transfer ${amount} from {selectedAccount} to {transferRecipient}?
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                  {/* The cancel button portion  */}
                  <button
                    onMouseEnter={() => setFundCancelHover(true)}
                    onMouseLeave={() => setFundCancelHover(false)}
                    onClick={() => {setTransferConfirmation(false); setFundCancelHover(false)}}
                    style={{marginTop: '1rem',width: '48%',height: '50px',padding: '0.5rem',backgroundColor: isFundCancelHover ? 'darkgray' : '#d1d5db',color: 'black',borderRadius: '0.375rem',fontSize: '1.25rem',border: 'none',cursor: 'pointer',transition: 'background-color 0.5s',}}
                  >
                    Cancel
                  </button>

                  {/* The confirm button portion */}
                  <button
                    onClick={() => {handleConfirm(); setFundConfirmHover(false)}}             
                    onMouseEnter={() => setFundConfirmHover(true)}
                    onMouseLeave={() => setFundConfirmHover(false)}
                    style={{marginTop: '1rem',width: '48%',height: '50px',padding: '0.5rem',backgroundColor: isFundConfirmHover ? '#00171F' : '#003459',color: 'white',borderRadius: '0.375rem',fontSize: '1.25rem',border: 'none',cursor: 'pointer',transition: 'background-color 0.5s',}}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </>
        );
        break;
      
      // This is for the desposit check portion
      case "Deposit Check":
        popupContent = (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>Deposit Check</h2>
            
            {/* Front of check image insert; having these pictures will do absolutely NOTHING*/}
            <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold'}}>Upload Front of Check</h3>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="file"
                accept="image/*"
                onChange ={(e) => {
                  const file = e.target.files?.[0];
                  setSelectedFrontImg(file ? URL.createObjectURL(file) : undefined);
                }}
                style={{width: '95%',padding: '0.5rem',border: '1px solid #ccc',borderRadius: '0.375rem'
                }}
              />
              {selectedFrontImg && (<p></p>)}
              {selectedFrontImg && (
                <img
                src={selectedFrontImg}
                width={382.5}
                height={82.5}
                alt="Selected Avatar"
                />
              )}
            </div>

            {/* Back of check image insertion; having these pictures will do absolutely NOTHING*/}
            <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold'}}>Upload Back of Check</h3>
            <div style={{ marginBottom: '2rem' }}>
              <input
                type="file"
                accept="image/*"
                onChange ={(e) => {
                  const file = e.target.files?.[0];
                  setSelectedBackImg(file ? URL.createObjectURL(file) : undefined);
                }}
                style={{width: '95%',padding: '0.5rem',border: '1px solid #ccc',borderRadius: '0.375rem'
                }}
              />

              {selectedBackImg && (<p></p>)}
              {selectedBackImg && (
                <img
                src={selectedBackImg}
                width={382.5}
                height={82.5}
                alt="Selected Avatar"
                />
              )}
            </div>

            {/* The input textbox */}
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="number"
                placeholder="Enter check amount"
                value={amount}
                onChange={handleAmountChange}
                style={{width: '95%',padding: '0.5rem',border: '1px solid #ccc',borderRadius: '0.375rem',height: '30px',fontSize: '0.9rem',borderStyle: 'solid',backgroundColor: 'white',color: 'black',}}
              />
            </div>

            {/* Confirmation Button */}
            <button
              onClick={handleConfirm}
              onMouseDown={() => setConfirmActive(true)}
              onMouseUp={() => setConfirmActive(false)}
              onMouseEnter={() => setConfirmHover(true)}
              onMouseLeave={() => setConfirmHover(false)}
              style={{marginTop: '1rem',width: '100%',height: '50px',padding: '0.5rem',backgroundColor: isConfirmHover ? '#00171F' : '#003459',color: 'white',borderRadius: '0.375rem',fontSize: '1.25rem',border: 'none',cursor: 'pointer',transition: 'background-color 0.3s, transform 0.4s ease',transform: isConfirmActive ? 'scale(0.95)' : 'scale(1)',}}
            >
              Deposit Check
            </button>
          </>
        );
        break;

      // This part is displaying the transaction
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

    // This portion is for the 'x' button to escape the popup; backend should NOT care about this part
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
            onClick={() => {setActivePopup(null); setSelectedFrontImg(undefined); setSelectedBackImg(undefined); setConfirmHover(false)}}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '40px',
              height: '40px',
              backgroundColor: '#d1d5db',
              color: 'black',
              borderRadius: '0.375rem',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              // ':hover': { backgroundColor: '#9ca3af' }
            }}>
            <X></X>
          </button>
          {popupContent}
        </div>
      </div>
    );
  };

  // This is the basic webpage layout
  return (
    // The div below describes basic body style
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', overflow: 'hidden', fontFamily: 'sans-serif', background: '#e2e2e2' }}>

      {/* The div below will describe the nav bar on the lefthand side
      That Nav bar will consist of selecting the account, the name of the person, selecting accounts, and a logout button */}
      <div style={{ width: '33%', backgroundColor: '#003459', color: 'white', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
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

          onClick={handleClick}
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
                  color: 'black', 
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
