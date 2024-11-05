import { useState } from "react";
// the cmd line to install this is 
// npm install lucide-react
// This package is for the icons used in this page
import { CornerUpLeft } from "lucide-react"; 

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
          $0.00
        </h2>
      </div>
    </div>
  );
}

export default AtmFeature;
