import AccountList from "../components/AccountList";
import WideImage from "../components/WideImage";
import FooterCard from "../components/FooterCard";
import SettingsTab from "../components/SettingsTab";

import { useState } from "react";
import './Homepage.css'
import './styles.css'

import images from '../images'

/*
    Account data reqs:

    id:         Specific id number
    name:       Name of account
    balance:    Numeric value representing balance stored in account
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

function Homepage() {

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

      <WideImage 
        image={images.home_cover}
        text="Bank of Banks"
      />

      {/* If logged in, display account listings */}
      {loggedIn === 1 && 
        <AccountList
          accounts={accounts}
          heading="Accounts"
          onSelectItem={handleSelectItem}
        />
      }

      {/* If not logged in, display links to go to account creation pages */}
      {loggedIn === 0 && 
        <AccountList
          accounts={noAccounts}
          heading="Accounts"
          onSelectItem={handleSelectItem}
        />
      }

      <WideImage
        image={images.home_signing}
      />

      <FooterCard />
    </div>
  );
}

export default Homepage;
