import AccountList from "../components/AccountList";
import WideImage from "../components/WideImage";
import FooterCard from "../components/FooterCard";
import DevTools from "../components/DevTools";

import { useState } from "react";
import './Homepage.css'
import '../styles.css'

import images from '../images'
import NavBar from "../components/NavBar";
import SectionHeader from "../components/SectionHeader";

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
    window.location.href = "/accountpage"; // Redirect to account page
  };

  const [loggedIn, setLoggedIn] = useState(0);

  // Handle login/logout
  const handleSelectOption = (setStatus: number) => {
    setLoggedIn(setStatus);
  }

  return (
    <div>

      {/* Temp dev tools tab to test certain functionalities */}
      <DevTools 
        loggedIn={loggedIn} 
        onSelectOption={handleSelectOption}
      />

      <NavBar/>

      <WideImage 
        image={images.home_cover}
        text="Bank of Banks"
      />

      <SectionHeader text="Accounts"/>

      {/* If logged in, display account listings */}
      {loggedIn === 1 && 
        <AccountList
          accounts={accounts}
          onSelectAccount={handleSelectItem}
        />
      }

      {/* If not logged in, display links to go to account creation pages */}
      {loggedIn === 0 && 
        <AccountList
          accounts={noAccounts}
          onSelectAccount={handleSelectItem}
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
