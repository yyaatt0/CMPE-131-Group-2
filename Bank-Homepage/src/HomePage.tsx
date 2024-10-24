import AccountList from "./components/AccountList";
import HeaderCard from "./components/HeaderCard";
import FooterCard from "./components/FooterCard";
import SettingsTab from "./components/SettingsTab";
import { useState } from "react";

/*
    Account data reqs:

    id:         Specific id number
    name:       Name of account
    balance:    Numeric value representing balance stored in account
    link:       String holding link to the account's separate page
*/
type account = {id: number, name: string, balance: number, link: string};

// Temp hardcoded data
let accounts: account[] = [
    { id: 0, name: "Personal Checking", balance: 1000, link: "https://github.com/yyaatt0/CMPE-131-Group-2" },
    { id: 1, name: "Personal Savings", balance: 10000, link: "https://docs.google.com/spreadsheets/d/1WRvQJEyPjevrso0SVSZM8QDFeyPlFV4ibF0aKqr-gvQ/edit?gid=0#gid=0" },
    { id: 2, name: "Business Checking", balance: 93758, link: "https://sjsu.edu/" },
    { id: 3, name: "Business Savings", balance: 500782, link: "https://www.youtube.com/"}
];
let noAccounts: account[] = [];

function HomePage() {

  // Handle account selection
  const handleSelectItem = (accLink: string) => {
    window.location.href = accLink; // Redirect to page specified by account
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
