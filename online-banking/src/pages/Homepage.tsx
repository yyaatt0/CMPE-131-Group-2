import AccountList from "../components/AccountList";
import HeaderCard from "../components/HeaderCard";
import FooterCard from "../components/FooterCard";
import SettingsTab from "../components/SettingsTab";
import { useState } from "react";
import './Homepage.css'

/*
    Account data reqs:

    id:         Specific id number
    name:       Name of account
    balance:    Numeric value representing balance stored in account
    link:       String holding link to the account's separate page
*/
type account = {id: number, name: string, balance: number};

// Temp hardcoded data
let accounts: account[] = [
    { id: 0, name: "Personal Checking", balance: 1000 },
    { id: 1, name: "Personal Savings", balance: 10000 },
    { id: 2, name: "Business Checking", balance: 93758 },
    { id: 3, name: "Business Savings", balance: 500782 }
];
let noAccounts: account[] = [];

function HomePage() {

  // Handle account selection
  const handleSelectItem = () => {
    window.location.href = "https://github.com/yyaatt0/CMPE-131-Group-2"; // Redirect to page specified by account
  };

  const [loggedIn, setLoggedIn] = useState(0);

  // Handle login/logout
  const handleSelectOption = (setStatus: number) => {
    setLoggedIn(setStatus);
  }

  return (
    <div>
      <SettingsTab 
        loggedIn={loggedIn} 
        onSelectOption={handleSelectOption}
      />
      <HeaderCard />
      {loggedIn === 1 && 
        <AccountList
          accounts={accounts}
          heading="Accounts"
          onSelectItem={handleSelectItem}
        />
      }
      {loggedIn === 0 && 
        <AccountList
          accounts={noAccounts}
          heading="Accounts"
          onSelectItem={handleSelectItem}
        />
      }
      <FooterCard />
    </div>
  );
}

export default HomePage;
